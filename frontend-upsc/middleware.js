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

const RESERVED_ROOT_SLUGS = new Set([
  'api',
  'assets',
  'images',
  'logo',
  'favicon.ico',
  'favicon.png',
  'apple-touch-icon.png',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml',
  'mentorship-courses',
  'mentorshipcourses',
  'login',
  'register',
  'home',
  'admin',
  'student',
  'contact-us',
  'about-us',
  'privacy-policy',
  'terms-and-conditions',
  'refund-cancellation',
  'careers',
  'success-stories',
  'budget-survey',
  'preparation-blogs',
  'preparation-blog',
  'blog',
  'current-affairs',
  'currentaffairs',
  'previous-year-papers',
  'free-study-materials',
  'free-resource',
  'upsc-syllabus',
  'download-ncerts',
  'upsc-age-calculator',
  'integrated-mentorship',
  'program',
  'courses',
  'course',
  'uppcs-mentorship',
  'uppcs-mentorship-2027',
  'mppsc-mentorship-2027',
]);

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

function isReservedRootSlug(slug) {
  const s = String(slug || '').trim().toLowerCase();
  if (!s) return true;
  if (RESERVED_ROOT_SLUGS.has(s)) return true;
  if (/\.[a-z0-9]{1,8}$/i.test(s)) return true;
  return false;
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

async function fetchCourseMetaBySlug(slug) {
  const metaRes = await fetch(`${API_BASE}/api/v1/course/meta/${encodeURIComponent(slug)}`, {
    headers: { Accept: 'application/json' },
  });
  if (!metaRes.ok) return null;
  const body = await metaRes.json();
  return body?.data?.data || body?.data || null;
}

async function fetchCourseMetaById(courseId) {
  const metaRes = await fetch(`${API_BASE}/api/v1/course/meta/id/${encodeURIComponent(courseId)}`, {
    headers: { Accept: 'application/json' },
  });
  if (!metaRes.ok) return null;
  const body = await metaRes.json();
  return body?.data?.data || body?.data || null;
}

function botHtmlFromCourseMeta(meta, fallbackCanonical) {
  if (!meta || typeof meta.title !== 'string') return null;
  return makeBotHtml({
    title: meta.title,
    description: (meta.description && String(meta.description).trim()) || stripHtml(meta.title),
    canonical: meta.url || fallbackCanonical,
    imageUrl: normalizeToHttps(meta.image, `${SITE_URL}/images/hero.webp`),
    type: 'website',
  });
}

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!BOT_UA.test(ua)) {
    return next();
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    const prepMatch = pathname.match(/^\/preparation-blog\/([^/]+)\/?$/);
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

    const currentAffairMatch = pathname.match(/^\/current-affairs\/([^/]+)\/?$/);
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

    const coursesByIdMatch = pathname.match(/^\/courses\/([^/]+)(?:\/[^/]+)?\/?$/);
    if (coursesByIdMatch) {
      const courseId = decodeURIComponent(coursesByIdMatch[1]);
      const meta = await fetchCourseMetaById(courseId);
      const html = botHtmlFromCourseMeta(meta, `${SITE_URL}${pathname}`);
      if (!html) return next();
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
        },
      });
    }

    const programMatch = pathname.match(/^\/program\/([^/]+)\/?$/);
    if (programMatch) {
      const slug = decodeURIComponent(programMatch[1]);
      const meta = await fetchCourseMetaBySlug(slug);
      const html = botHtmlFromCourseMeta(meta, `${SITE_URL}/program/${encodeURIComponent(slug)}`);
      if (!html) return next();
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
        },
      });
    }

    const rootMatch = pathname.match(/^\/([^/]+)\/?$/);
    if (rootMatch) {
      const slug = decodeURIComponent(rootMatch[1]);
      if (isReservedRootSlug(slug)) return next();
      const meta = await fetchCourseMetaBySlug(slug);
      const html = botHtmlFromCourseMeta(meta, `${SITE_URL}/${encodeURIComponent(slug)}`);
      if (!html) return next();
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
  matcher: [
    '/preparation-blog/:path*',
    '/current-affairs/:path*',
    '/courses/:path*',
    '/program/:path*',
    '/((?!api|assets|images|Logo|favicon|_next|.*\\..*).*)',
  ],
};
