# SEO and social previews (preparation blogs)

This stack uses three layers:

1. **React (`react-helmet-async`)** — Updates `<title>` and Open Graph / Twitter tags in the browser after data loads (good for users and JS-capable crawlers).
2. **HTML injection for crawlers** — When the API process also serves the Vite `dist` folder, known bots (Facebook, WhatsApp, LinkedIn, Twitter, etc.) get `index.html` with meta tags **already in the HTML** for `/preparation-blog/:slug`.
3. **Optional `prerender-node`** — Forwards eligible bot requests to an external Prerender.io-compatible service for **full-page** prerendering (optional).

## Environment variables

### Backend (`UPSC-Backend`)

| Variable | Purpose |
|----------|---------|
| `SITE_URL` | Public site origin for canonical URLs and default OG image host, e.g. `https://mentorsdaily.com` |
| `PUBLIC_API_BASE_URL` | Absolute base for `og:image` when the image is served from the API (e.g. `https://api.mentorsdaily.com`). Falls back to `API_PUBLIC_URL`, `VITE_API_URL`, then `SITE_URL`. |
| `FRONTEND_DIST` | Absolute path to the Vite production build (`.../frontend-upsc/dist`). When set, Express serves the SPA and runs bot meta injection. |
| `PRERENDER_SERVICE_URL` | Optional. Example: `https://service.prerender.io/` |
| `PRERENDER_TOKEN` | Optional token for Prerender.io when using their hosted service. |

### Frontend (`frontend-upsc`)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend base URL (existing). |
| `VITE_SITE_URL` | Overrides default `https://mentorsdaily.com` in `SEO_CONFIG` and client-side absolute URLs. |

## Unified deploy (recommended for social previews)

1. Build the frontend: `npm run build` in `frontend-upsc`.
2. Point `FRONTEND_DIST` at that `dist` folder and start the backend on the **same public host** you use for the site (or behind a reverse proxy that routes `/` and `/api` to this process).
3. Set `SITE_URL` and `PUBLIC_API_BASE_URL` correctly so `og:image` is a reachable **https** URL.

## API-only deploy (frontend on CDN / static host)

- Social bots will **not** get injected meta unless you also:

  - Put **Cloudflare Workers**, **nginx + njs**, or similar in front to fetch meta from `GET /api/v1/preparation/meta/:slug` and inject into HTML, or  
  - Run a small Node host that serves `dist` + this injection logic, or  
  - Enable **Prerender.io** (or self-hosted Prerender) with `PRERENDER_SERVICE_URL` + `prerender-node`.

## New API routes

- `GET /api/v1/preparation/by-slug/:slug` — Public blog document (same shape as list items, with populated `file`).
- `GET /api/v1/preparation/meta/:slug` — JSON: `{ title, description, image, url, pathname, plainTitle }` for integrations.

## Sitemap (frontend)

Regenerate preparation-blog URLs:

```bash
cd frontend-upsc
set SITE_URL=https://mentorsdaily.com
set API_URL=https://api.mentorsdaily.com
npm run seo:sitemap
```

Writes `public/sitemap-preparation-blogs.xml`. `robots.txt` references this file.

## Verify previews

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- Twitter/X card validator (tool availability varies)

Use “Scrape again” after deploy so caches refresh.
