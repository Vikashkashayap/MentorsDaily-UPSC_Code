# Google Search Console — post-deploy checklist

After deploying `frontend-upsc-next` to AWS:

1. Open [Google Search Console](https://search.google.com/search-console) and select the `mentorsdaily.com` property (or add it).
2. Submit the sitemap URL: `https://mentorsdaily.com/sitemap.xml` (served by Next.js `src/app/sitemap.ts`).
3. Request indexing for high-value URLs:
   - `https://mentorsdaily.com/`
   - `https://mentorsdaily.com/integrated-mentorship-2027`
   - `https://mentorsdaily.com/blogs/answer-writing-tips`
   - `https://mentorsdaily.com/current-affairs`
   - `https://mentorsdaily.com/preparation-blogs`
4. In **Performance**, track long-tail queries after 2–4 weeks (e.g. "UPSC age calculator", "IMP 2027 mentorship", "daily current affairs GS2").
5. Ensure nginx serves the Next app for all public routes so server-rendered `<title>` and meta tags appear in View Source (not only `react-helmet-async` after JS).

Regenerate local SEO data after editing legacy copy:

```bash
node scripts/port-seo-data.mjs
```
