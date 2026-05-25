# MentorsDaily: React Vite → Next.js 15 App Router Migration

## Analysis summary (source: `frontend-upsc/`)

| Area | Vite stack | Count |
|------|------------|-------|
| Routing | `react-router-dom` v7 (`AppRoutes`, `PublicRoutes`, `BlogRoutes`, `AdminRoutes`, `UserRoutes`) | ~70 routes |
| Pages | `src/pages/public`, `admin`, `user`, `blogs` | 60+ page components |
| SEO | `react-helmet-async`, `SEO.jsx`, `seoConfig.js`, static sitemap script | Client-only meta |
| API | `baseService.js` + axios, `VITE_API_URL` | Unchanged contract |
| Auth | `ProtectedRoute` + `localStorage` token | Client-side |
| Styling | Tailwind v4 + large `index.css` | Preserved in `src/styles/legacy.css` |

## Target structure (`frontend-upsc-next/`)

```
src/
├── app/                    # Next.js App Router (page.tsx per URL)
├── components/             # New/shared Next wrappers (layouts, providers)
├── legacy/                 # Copied Vite src (being migrated incrementally)
├── lib/                    # SEO, navigation shim, env, schema
├── services/               # API layer (TypeScript)
├── hooks/
├── utils/
├── context/
├── styles/
└── types/
```

## Route mapping (Vite → App Router)

| Vite path | Next.js path |
|-----------|--------------|
| `/` | `app/page.tsx` |
| `/login`, `/register` | `app/login/page.tsx`, `app/register/page.tsx` |
| `/blogs/:slug` | `app/blogs/[slug]/page.tsx` (static slugs from manifest) |
| `/preparation-blog/:slug` | `app/preparation-blog/[slug]/page.tsx` + `generateMetadata` |
| `/course/:category/:title` | `app/course/[category]/[title]/page.tsx` |
| `/courses/:courseId/:courseSlug?` | `app/courses/[courseId]/[[...courseSlug]]/page.tsx` |
| `/current-affairs/:slug` | `app/current-affairs/[slug]/page.tsx` |
| `/admin/*` | `app/admin/(dashboard)/...` + `middleware.ts` |
| `/home`, `/library`, etc. | `app/(authenticated)/...` |

## Phases

1. **Foundation** (this PR): Next scaffold, legacy copy, navigation shim, SEO lib, sitemap/robots, root layout, public routes.
2. **SEO hardening**: Server `generateMetadata` for blogs/courses/CA; JSON-LD in layouts; `next/image` pass.
3. **Auth**: Middleware + cookie migration (optional); protected route groups.
4. **Cleanup**: Move `legacy/*` → `components/`, remove shim, delete Vite app when parity verified.

## Environment variables

| Vite | Next.js |
|------|---------|
| `VITE_API_URL` | `NEXT_PUBLIC_API_URL` |
| `VITE_SITE_URL` | `NEXT_PUBLIC_SITE_URL` |
| `VITE_RAZORPAY_*` | `NEXT_PUBLIC_RAZORPAY_*` |
| `VITE_IMP_*_COURSE_ID` | `NEXT_PUBLIC_IMP_*_COURSE_ID` |

## Production

- Deploy on Vercel/Node with `next build && next start`
- Set `NEXT_PUBLIC_API_URL` to production API (unchanged backend)
- Revalidate sitemap via `app/sitemap.ts` (dynamic preparation blogs from API)

## Parity checklist

- [ ] All public URLs return 200
- [ ] Legacy redirects (`/currentAffairs`, `/MentorshipCourses`, `/blog/:slug`)
- [ ] Admin/user auth redirects
- [ ] Razorpay checkout env vars
- [ ] Lighthouse SEO ≥ 90 on key pages
