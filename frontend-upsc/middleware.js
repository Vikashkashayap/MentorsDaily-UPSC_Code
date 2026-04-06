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

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!BOT_UA.test(ua)) {
    return next();
  }

  const url = new URL(request.url);
  const match = url.pathname.match(/^\/preparation-blog\/([^/]+)\/?$/);
  if (!match) {
    return next();
  }

  const slug = decodeURIComponent(match[1]);

  try {
    const metaRes = await fetch(
      `${API_BASE}/api/v1/preparation/meta/${encodeURIComponent(slug)}`,
      { headers: { Accept: 'application/json' } },
    );

    if (!metaRes.ok) {
      return next();
    }

    const body = await metaRes.json();
    const meta = body?.data?.data;
    if (!meta || typeof meta.title !== 'string') {
      return next();
    }

    const desc =
      (meta.description && String(meta.description).trim()) ||
      stripHtml(meta.title);
    const canonical = meta.url || `${SITE_URL}/preparation-blog/${encodeURIComponent(slug)}`;

    let imageUrl = meta.image || `${SITE_URL}/images/hero.png`;
    if (/^http:\/\//i.test(imageUrl)) {
      imageUrl = `https://${imageUrl.slice(7)}`;
    }

    const docTitle = escapeAttr(meta.title);
    const plainForAlt = escapeAttr(
      meta.plainTitle || stripHtml(meta.title).replace(/\s*\|\s*MentorsDaily\s*$/i, ''),
    );

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${docTitle}</title>
  <meta name="description" content="${escapeAttr(desc)}" />
  <link rel="canonical" href="${escapeAttr(canonical)}" />
  <meta property="og:title" content="${docTitle}" />
  <meta property="og:description" content="${escapeAttr(desc)}" />
  <meta property="og:url" content="${escapeAttr(canonical)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="MentorsDaily" />
  <meta property="og:image" content="${escapeAttr(imageUrl)}" />
  ${/^https:\/\//i.test(imageUrl) ? `<meta property="og:image:secure_url" content="${escapeAttr(imageUrl)}" />` : ''}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${plainForAlt}" />
  <meta property="og:locale" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@mentorsdaily" />
  <meta name="twitter:title" content="${docTitle}" />
  <meta name="twitter:description" content="${escapeAttr(desc)}" />
  <meta name="twitter:image" content="${escapeAttr(imageUrl)}" />
  <meta name="twitter:image:alt" content="${plainForAlt}" />
</head>
<body>
  <p><a href="${escapeAttr(canonical)}">${docTitle}</a> — MentorsDaily</p>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch {
    return next();
  }
}

export const config = {
  matcher: '/preparation-blog/:path*',
};
