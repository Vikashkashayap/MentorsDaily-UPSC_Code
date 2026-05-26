# Frontend Optimization Report

**Project:** `frontend-upsc`  
**Date:** 2026-05-23  
**Target:** AWS t3.micro (low RAM, low bandwidth, fast deploy)

---

## Before vs After

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Production `dist/` size** | 23.99 MB | **4.07 MB** | **−83%** |
| **Build time** | 14.5 s | 16.2 s | +12% (acceptable; more chunk analysis) |
| **`node_modules` (dev install)** | 147.7 MB | 168.9 MB | +14% (added `sharp` dev tool; removed 4 heavy runtime packages) |
| **Largest JS chunk (`vendor-react`)** | 623.8 KB | 143.5 KB | **−77%** |
| **Entry/index JS chunk** | 301.5 KB | 120.5 KB | **−60%** |
| **Initial gzip JS (index + vendor-react + vendor-router + vendor-http + vendor-helmet)** | ~231 KB | ~101 KB | **−56%** |
| **Transformed modules** | 3,089 | 2,901 | −188 |
| **Main CSS bundle** | 241.0 KB | 227.6 KB | −6% |

### Key gzip sizes (after)

| Chunk | Gzip |
|-------|------|
| `vendor-charts` (admin only, lazy) | 105.8 KB |
| `vendor-react` | 46.0 KB |
| `index` | 28.2 KB |
| `vendor-motion` (footer + lazy pages) | 38.8 KB |
| `vendor-router` | 12.1 KB |
| `vendor-http` (axios) | 14.6 KB |

---

## Removed npm packages

| Package | Reason |
|---------|--------|
| `draft-js` | Only used by deleted `RichTextEditor.jsx`; app uses `RichTextField` (contentEditable) |
| `draftjs-to-html` | Same |
| `html-to-draftjs` | Same |
| `react-draft-wysiwyg` | Same |

## Added npm packages

| Package | Reason |
|---------|--------|
| `react-is` | Required peer for `recharts` after dependency tree cleanup |
| `sharp` (dev) | Image optimization script only; not shipped to production |

---

## Removed files

### Components
- `src/components/FloatingEditor.jsx` — duplicate unused draft editor
- `src/components/RichTextEditor.jsx` — unused; draft stack removed
- `src/components/utility/Message.jsx` — superseded by `MessageDisplay`
- `src/components/AIStudentDashboardBanner.jsx` — commented out everywhere
- `src/components/DiwaliOfferBanner.jsx` — commented out everywhere

### Pages (orphan / no routes)
- `src/pages/Home.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/public/AccessDenied.jsx`
- `src/pages/public/UPSCPreparationBlog.jsx`
- `src/pages/admin/ManageContent.jsx`
- `src/pages/admin/GetAllUsers.jsx`
- `src/pages/admin/CreateCourse.jsx`
- `src/pages/admin/PostCurrentAffair.jsx`

### Assets
- 25 large PNG originals in `public/images/` (replaced by WebP)
- `public/images/purple happy diwali email header.png` (unused)

---

## Code optimizations applied

### Bundle & Vite
- Improved `manualChunks`: `vendor-charts`, `vendor-motion`, `vendor-http`, `vendor-router`, `vendor-icons`, `vendor-helmet`, `vendor-react`
- Production `esbuild.drop`: `console`, `debugger`
- Disabled source maps (unchanged)
- Removed draft-js from `optimizeDeps` and vendor-react chunk

### React / loading
- Lazy-loaded `Footer` in `PublicLayout` → `framer-motion` in separate `vendor-motion` chunk
- Deduplicated `EnhancedHorizontalCourseScroller` (removed ~215 lines from `LandingPage.jsx`)
- Routes were already lazy-loaded (kept)

### API / utilities
- Removed dead exports: `fetchCourseById`, `getPaymentReceipt`
- Removed unused `messageHandler` exports
- Removed commented legacy code in `baseService.js`
- Removed debug `console.log` calls

### Assets
- Converted 25 images PNG → WebP (~19.4 MB saved in source assets)
- Updated all blog/SEO/hero image references to `.webp`
- Added `npm run assets:optimize` script

### nginx (EC2)
- Added `deploy/nginx.conf` with SPA fallback, gzip, asset caching, API proxy

---

## Build verification

```
npm run build  ✅ SUCCESS (14.7s)
npm run lint   ⚠️  Pre-existing: no eslint.config.js (ESLint v9 flat config not set up)
```

---

## Deployment notes (t3.micro)

1. **Build on CI or locally**, deploy only `dist/` — avoids running Vite on 1 GB RAM.
2. Use `deploy/nginx.conf` — gzip + long-cache for `/assets/*`, no-cache for `index.html`.
3. Run `npm run assets:optimize` before build when adding new large PNG/JPG assets.
4. Admin charts (`recharts`) load only on `/admin/*` routes via existing lazy imports.

---

## Optional follow-ups (not applied — higher risk)

- Replace `framer-motion` in utility pages with CSS (would remove `vendor-motion` ~118 KB)
- Consolidate `authUtils.getUserData` vs `userData.getUserData`
- Add ESLint flat config (`eslint.config.js`)
- Split very large course landing pages (`IntegratedMentorship2028/2029` ~70 KB each)
