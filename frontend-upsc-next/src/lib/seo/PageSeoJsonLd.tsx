import { SEO_CONFIG } from "@/lib/seo/config";
import { getPageSeoEntry } from "@/lib/seo/pages";
import { courseSchema, faqSchema, JsonLd, webApplicationSchema } from "@/lib/seo/schema";
import { LANDING_FAQS } from "@/lib/seo/home-schemas";

export function MentorshipCourseJsonLd({ path }: { path: string }) {
  const seo = getPageSeoEntry(path);
  if (!seo) return null;
  const url = `${SEO_CONFIG.siteUrl}${path}`;
  const name = seo.title.replace(/\s*\|\s*MentorsDaily.*$/i, "").trim();
  return (
    <JsonLd
      data={courseSchema({
        name,
        description: seo.description,
        url,
      })}
    />
  );
}

export function AgeCalculatorJsonLd() {
  const path = "/upsc-age-calculator";
  const seo = getPageSeoEntry(path);
  const url = `${SEO_CONFIG.siteUrl}${path}`;
  const name = seo?.title ?? "UPSC Age Calculator";
  const description =
    seo?.description ??
    "Check UPSC age limit, eligibility, and remaining attempts.";
  return (
    <JsonLd
      data={[
        webApplicationSchema({ name, description, url }),
        faqSchema([
          {
            question: "How do I check UPSC age limit for my category?",
            answer:
              "Enter your date of birth and category in the MentorsDaily UPSC Age Calculator to see age limit, relaxation, and remaining attempts.",
          },
          {
            question: "Does the calculator include OBC, SC, ST, and EWS limits?",
            answer:
              "Yes. The tool applies category-wise age relaxation and attempt limits as per UPSC CSE rules.",
          },
        ]),
      ]}
    />
  );
}

export { LANDING_FAQS };
