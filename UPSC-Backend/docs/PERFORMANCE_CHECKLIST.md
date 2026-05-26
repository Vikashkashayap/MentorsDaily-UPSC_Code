# Performance checklist (MentorsDaily UPSC stack)

## Implemented in repo

| Area | Change |
|------|--------|
| **Express** | `compression` tuned (`threshold: 1024`, `level: 6`). |
| **API cache** | In-memory GET cache for anonymous requests on hot public paths (`get-course`, `get-affairs`, `preparation/get-blog`, `free-resourse/all`, `previousyear/get-all-papers`, `course/slug/*`). Header `X-Cache: HIT\|MISS`. Disable: `API_CACHE_TTL_MS=0`. Default TTL: 45s. |
| **HTTP cache headers** | Existing `Cache-Control` on read-heavy APIs (60s + `stale-while-revalidate`). |
| **MongoDB** | Compound indexes on `FreeResource` (active + category/subject + `createdAt`), `PreparationBlog` (status + dates, category + `createdAt`), `Course` (category + `createdAt`). |
| **Free resources API** | Pagination (`page`, `limit`, max 200) + `.lean()` + `totalCount` / `totalPages`. Unpaged callers get up to 500 docs with full `countDocuments`. |
| **Preparation blogs (public list)** | Paged public queries omit heavy `content` field (search still matches `content` in DB). |
| **S3 uploads** | `Cache-Control: public, max-age=31536000, immutable` (existing in `s3.js`). |

## Frontend (see `frontend-upsc`)

| Area | Change |
|------|--------|
| **Code splitting** | `manualChunks`: `vendor-react`, `vendor-router`, `vendor-editor`, `vendor-icons`. |
| **Route loading** | Existing `React.lazy` + `Suspense` + `RouteSkeleton`. |
| **Blog section** | Skeleton instead of blank screen while loading. |
| **Route skeleton** | Dark-mode-friendly pulse styles. |
| **Free resources client** | Default `page=1`, `limit=120` on list API. Admin uses `limit=300`. |
| **Search** | Preparation blogs already debounced (350ms). Free study materials debounced via delayed fetch (500ms). |

## Recommended next steps (infra / ops)

1. **CDN**: Put static assets + S3 behind **CloudFront**; enable Brotli at the edge (Express `compression` is gzip-only).
2. **Images**: Run hero/thumbnail assets through **Sharp** / Squoosh (WebP, width caps); S3 URLs stay cacheable.
3. **Redis**: Replace in-process API cache with Redis when you move off a single free-tier instance.
4. **MongoDB Atlas**: M10+ for metrics; use **Performance Advisor** to confirm index usage.
5. **Bundle**: Run `npm run build` and watch `vendor-editor`; load admin routes only for admins (already lazy).

## Before vs after (qualitative)

| Metric | Before | After |
|--------|--------|--------|
| Repeat public API hits | Hit Mongo every time | Served from memory ~45s (`X-Cache: HIT`) |
| Free resources payload | Up to entire collection | Paginated (e.g. 120 rows) + lean JSON |
| Public blog list transfer | Full HTML `content` per row | List without `content` for paged public views |
| Initial JS download | One large bundle risk | Split React / router / editor / icons |
| First paint (blog section) | Empty | Skeleton |

Exact TTFB and LCP depend on Atlas tier, region, and CDN; measure with Lighthouse and your API `Server-Timing` if you add it later.
