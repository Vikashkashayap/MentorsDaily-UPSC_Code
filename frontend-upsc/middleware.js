import { next } from '@vercel/functions';

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://mentorsdaily.com').replace(
  /\/$/,
  '',
);
const API_BASE = (
  process.env.VITE_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  process.env.PUBLIC_API_URL ||
  'https://api.mentorsdaily.com'
).replace(/\/$/, '');

const BOT_UA =
  /facebookexternalhit|Facebot|LinkedInBot|Twitterbot|Slackbot|Discordbot|WhatsApp|TelegramBot|Pinterest|vkShare|redditbot|Applebot|Googlebot|bingbot|YandexBot|Baiduspider/i;

function stripHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeToHttps(url, fallback) {
  const raw = String(url || '').trim();
  if (!raw) return fallback;
  if (/^http:\/\//i.test(raw)) return `https://${raw.slice(7)}`;
  if (/^https:\/\//i.test(raw)) return raw;
  if (raw.startsWith('//')) return `https:${raw}`;
  if (raw.startsWith('/')) return `${SITE_URL}${raw}`;
  return `${SITE_URL}/${raw.replace(/^\/+/, '')}`;
}

function makeBotHtml({ title, description, canonical, imageUrl, type = 'article' }) {
  const docTitle = escapeAttr(title);
  const desc = escapeAttr(description || stripHtml(title));
  const url = escapeAttr(canonical);
  const img = escapeAttr(imageUrl);
  const plainForAlt = escapeAttr(stripHtml(title).replace(/\s*\|\s*MentorsDaily\s*$/i, ''));
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${docTitle}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${docTitle}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="${escapeAttr(type)}" />
  <meta property="og:site_name" content="MentorsDaily" />
  <meta property="og:image" content="${img}" />
  ${/^https:\/\//i.test(imageUrl) ? `<meta property="og:image:secure_url" content="${img}" />` : ''}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${plainForAlt}" />
  <meta property="og:locale" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@mentorsdaily" />
  <meta name="twitter:title" content="${docTitle}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${img}" />
  <meta name="twitter:image:alt" content="${plainForAlt}" />
</head>
<body>
  <p><a href="${url}">${docTitle}</a> — MentorsDaily</p>
</body>
</html>`;
}

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!BOT_UA.test(ua)) {
    return next();
  }

  const url = new URL(request.url);
  const prepMatch = url.pathname.match(/^\/preparation-blog\/([^/]+)\/?$/);
  const currentAffairMatch = url.pathname.match(/^\/current-affairs\/([^/]+)\/?$/);
  const courseMatch = url.pathname.match(/^\/(integrated-mentorship-\d{4})\/?$/);
  if (!prepMatch && !currentAffairMatch && !courseMatch) return next();

  try {
    if (prepMatch) {
      const slug = decodeURIComponent(prepMatch[1]);
      const metaRes = await fetch(
        `${API_BASE}/api/v1/preparation/meta/${encodeURIComponent(slug)}`,
        { headers: { Accept: 'application/json' } },
      );
      if (!metaRes.ok) return next();
      const body = await metaRes.json();
      const meta = body?.data?.data;
      if (!meta || typeof meta.title !== 'string') return next();
      const html = makeBotHtml({
        title: meta.title,
        description: (meta.description && String(meta.description).trim()) || stripHtml(meta.title),
        canonical: meta.url || `${SITE_URL}/preparation-blog/${encodeURIComponent(slug)}`,
        imageUrl: normalizeToHttps(meta.image, `${SITE_URL}/images/hero.png`),
        type: 'article',
      });
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    if (currentAffairMatch) {
      const slug = decodeURIComponent(currentAffairMatch[1]);
      const detailRes = await fetch(
        `${API_BASE}/api/v1/get-affairs?slug=${encodeURIComponent(slug)}`,
        { headers: { Accept: 'application/json' } },
      );
      if (!detailRes.ok) return next();
      const body = await detailRes.json();
      const post = body?.data?.data;
      if (!post || typeof post.title !== 'string') return next();
      const html = makeBotHtml({
        title: `${stripHtml(post.title)} | Current Affairs for UPSC`,
        description: stripHtml(post.description || post.content || post.title).slice(0, 180),
        canonical: `${SITE_URL}/current-affairs/${encodeURIComponent(slug)}`,
        imageUrl: normalizeToHttps(post.thumbnailUrl, `${SITE_URL}/images/hero.png`),
        type: 'article',
      });
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
        },
      });
    }

    if (courseMatch) {
      const slug = decodeURIComponent(courseMatch[1]);
      const courseRes = await fetch(
        `${API_BASE}/api/v1/course/slug/${encodeURIComponent(slug)}`,
        { headers: { Accept: 'application/json' } },
      );
      if (!courseRes.ok) return next();
      const body = await courseRes.json();
      const course = body?.data?.data;
      if (!course || typeof course.title !== 'string') return next();
      const html = makeBotHtml({
        title: stripHtml(course.title),
        description: stripHtml(course.description || course.title).slice(0, 180),
        canonical: `${SITE_URL}/${encodeURIComponent(slug)}`,
        imageUrl: normalizeToHttps(course.thumbnailUrl, `${SITE_URL}/images/hero.png`),
        type: 'website',
      });
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
        },
      });
    }

    return next();
  } catch {
    return next();
  }
}

export const config = {
  matcher: ['/preparation-blog/:path*', '/current-affairs/:path*', '/integrated-mentorship-:year*'],
};
