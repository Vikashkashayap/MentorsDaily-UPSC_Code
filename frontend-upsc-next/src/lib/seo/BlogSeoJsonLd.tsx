import { SEO_CONFIG } from "@/lib/seo/config";
import { getBlogSeoEntry } from "@/lib/seo/pages";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/seo/schema";

export function BlogSeoJsonLd({ slug }: { slug: string }) {
  const seo = getBlogSeoEntry(slug);
  const path = `/blogs/${slug}`;
  const url = `${SEO_CONFIG.siteUrl}${path}`;
  const title = seo?.title?.replace(/\s*\|\s*MentorsDaily.*$/i, "") ?? slug;
  const description = seo?.description ?? `Expert UPSC guide: ${title}`;
  return (
    <JsonLd
      data={[
        articleSchema({
          title,
          description,
          url,
          image: seo?.image,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/preparation-blogs" },
          { name: title, path },
        ]),
      ]}
    />
  );
}
