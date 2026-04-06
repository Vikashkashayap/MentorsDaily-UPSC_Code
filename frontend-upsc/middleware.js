import { next } from '@vercel/functions';

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://mentorsdaily.com').replace(
  /\/$/,
  '',
);
const API_BASE = (process.env.VITE_API_URL || process.env.PUBLIC_API_URL || 'https://api.mentorsdaily.com').replace(
  /\/$/,
  '',
);

const BOT_UA =
  /facebookexternalhit|Facebot|LinkedInBot|Twitterbot|Slackbot|Discordbot|WhatsApp|TelegramBot|Pinterest|vkShare|redditbot|Applebot|Googlebot|bingbot|YandexBot|Baiduspider/i;

function stripHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateSlugFromTitle(text) {
  const plain = stripHtml(text);
  return plain
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
    const res = await fetch(`${API_BASE}/api/v1/preparation/get-blog`, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return next();
    }

    const body = await res.json();
    const payload = body?.data;
    const blogsData = payload?.data ?? payload;
    const blogsArray = Array.isArray(blogsData) ? blogsData : [];

    const blog = blogsArray.find((b) => {
      if (b.slug === slug) return true;
      const generated = generateSlugFromTitle(b.title);
      return generated === slug || String(b._id) === slug;
    });

    if (!blog) {
      return next();
    }

    const title = stripHtml(blog.title) || 'Blog | MentorsDaily';
    const rawDesc = blog.shortDescription || stripHtml(blog.content).slice(0, 160);
    const desc = rawDesc.trim() || title;
    const canonical = `${SITE_URL}/preparation-blog/${encodeURIComponent(slug)}`;

    let imageUrl = `${SITE_URL}/images/hero.png`;
    if (blog.file?._id && blog.file.contentType?.startsWith('image/')) {
      imageUrl = `${API_BASE}/api/v1/download/${blog.file._id}`;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeAttr(title)} | MentorsDaily</title>
  <meta name="description" content="${escapeAttr(desc)}" />
  <link rel="canonical" href="${escapeAttr(canonical)}" />
  <meta property="og:title" content="${escapeAttr(title)}" />
  <meta property="og:description" content="${escapeAttr(desc)}" />
  <meta property="og:url" content="${escapeAttr(canonical)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="MentorsDaily" />
  <meta property="og:image" content="${escapeAttr(imageUrl)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeAttr(title)}" />
  <meta property="og:locale" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@mentorsdaily" />
  <meta name="twitter:title" content="${escapeAttr(title)}" />
  <meta name="twitter:description" content="${escapeAttr(desc)}" />
  <meta name="twitter:image" content="${escapeAttr(imageUrl)}" />
</head>
<body>
  <p><a href="${escapeAttr(canonical)}">${escapeAttr(title)}</a> — MentorsDaily</p>
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
