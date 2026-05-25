import { SEO_CONFIG } from "@/lib/seo/config";

export const LANDING_FAQS = [
  {
    question: "What does MentorsDaily offer for UPSC preparation?",
    answer:
      "MentorsDaily offers structured UPSC mentorship, current affairs support, answer writing evaluation, tests, and personalized guidance for Prelims, Mains, and Interview preparation.",
  },
  {
    question: "Are MentorsDaily courses suitable for beginners and repeat aspirants?",
    answer:
      "Yes. MentorsDaily courses are designed for beginners, working professionals, and repeat aspirants with guided timelines, mentor feedback, and flexible learning support.",
  },
  {
    question: "How can I start with MentorsDaily?",
    answer:
      "You can explore featured courses on the landing page, review program details, and enroll directly through the course cards or enquiry options.",
  },
] as const;

export function landingItemListSchema(
  courses: { title?: string; description?: string }[] = []
) {
  const homepageUrl = SEO_CONFIG.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured UPSC Mentorship Courses",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: course.title || "UPSC Course",
      description:
        course.description || "UPSC mentorship and preparation course",
      url: homepageUrl,
    })),
  };
}
