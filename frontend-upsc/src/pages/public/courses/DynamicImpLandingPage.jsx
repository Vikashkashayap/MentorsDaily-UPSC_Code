import React from "react";
import { useParams } from "react-router-dom";
import IntegratedMentorship2026 from "./IntegratedMentorship2026";
import IntegratedMentorship2027 from "./IntegratedMentorship2027";
import IntegratedMentorship2028 from "./IntegratedMentorship2028";
import IntegratedMentorship2029 from "./IntegratedMentorship2029";
import IntegratedMentorship2030 from "./IntegratedMentorship2030";
import { IMP_2027_SLUG } from "./imp2027DetailDefaults";
import { IMP_2028_SLUG } from "./imp2028DetailDefaults";
import { IMP_2029_SLUG } from "./imp2029DetailDefaults";

const LEGACY_SLUG_ALIASES = {
  "integrated mentorship 2026": "integrated-mentorship-2026",
  "integrated mentorship 2027": IMP_2027_SLUG,
  "integrated mentorship 2028": IMP_2028_SLUG,
  "integrated mentorship 2029": IMP_2029_SLUG,
  "integrated mentorship 2030": "integrated-mentorship-2030",
  "imp-2026": "integrated-mentorship-2026",
  "imp-2027": IMP_2027_SLUG,
  "imp-2028": IMP_2028_SLUG,
  "imp-2029": IMP_2029_SLUG,
  "imp-2030": "integrated-mentorship-2030",
};

const normalizeSlug = (value = "") => {
  let raw = String(value ?? "");
  try {
    raw = decodeURIComponent(raw);
  } catch {
    // Keep raw value when URL contains malformed escape sequences.
  }

  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function DynamicImpLandingPage() {
  const { slug } = useParams();
  const normalizedSlug = normalizeSlug(slug);
  const canonicalSlug = LEGACY_SLUG_ALIASES[normalizedSlug] || normalizedSlug;

  const slugToComponent = {
    "integrated-mentorship-2026": <IntegratedMentorship2026 />,
    [IMP_2027_SLUG]: <IntegratedMentorship2027 />,
    [IMP_2028_SLUG]: <IntegratedMentorship2028 />,
    [IMP_2029_SLUG]: <IntegratedMentorship2029 />,
    "integrated-mentorship-2030": <IntegratedMentorship2030 />,
  };

  if (slugToComponent[canonicalSlug]) {
    return slugToComponent[canonicalSlug];
  }

  // Final safety net for unknown slug variants that still include a target year.
  const yearMatch = canonicalSlug.match(/(202[6-9]|2030)/);
  if (yearMatch) {
    const byYear = slugToComponent[`integrated-mentorship-${yearMatch[0]}`];
    if (byYear) return byYear;
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#F8F9FB] px-6 text-center">
      <div>
        <h1 className="text-2xl font-bold text-[#1A3C6E] mb-2">Program not found</h1>
        <p className="text-[#6B7280]">Please check the URL or explore available programs.</p>
      </div>
    </div>
  );
}
