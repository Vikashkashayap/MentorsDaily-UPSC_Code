import { faqSchema, JsonLd } from "@/lib/seo/schema";
import { LANDING_FAQS } from "@/lib/seo/home-schemas";

/** Static homepage FAQ structured data (ItemList is client-driven on legacy landing). */
export default function HomeSeoJsonLd() {
  return <JsonLd data={faqSchema([...LANDING_FAQS])} />;
}
