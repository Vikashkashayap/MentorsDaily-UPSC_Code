import { memo } from "react";
import { motion } from "framer-motion";

const sections = [
  {
    id: "age-limit",
    title: "UPSC Age Limit Explained",
    content: [
      "The UPSC Civil Services Examination (CSE) sets strict age criteria for IAS, IPS, IFS, and other Group A services. The upper age limit varies by category, while the minimum age is uniformly 21 years.",
      "MentorsDaily UPSC Age Calculator uses the official cutoff — 1 August of the exam year — so you get the same age figure UPSC uses in its notification. Whether you are checking IAS eligibility or planning your first attempt, accurate age calculation is the first step.",
    ],
  },
  {
    id: "relaxation",
    title: "Category-wise Age Relaxation",
    content: [
      "General and EWS: maximum 32 years, 6 attempts. OBC (NCL): 35 years, 9 attempts. SC/ST: 37 years, unlimited attempts within the age window. PwBD: up to 42 years with 9 attempts (subject to sub-category rules in the official notification).",
      "Use our UPSC eligibility calculator to compare categories instantly. Understanding UPSC age limit for OBC, SC/ST, and General helps you choose the right exam year before the notification is released.",
    ],
  },
  {
    id: "attempts",
    title: "UPSC Attempt Limits",
    content: [
      "Attempts are counted for every appearance in the Preliminary Examination, including withdrawn applications in some cases as per UPSC rules. The UPSC attempt calculator on this page subtracts attempts already used from your category limit.",
      "SC/ST candidates face no numerical attempt cap but must stay within the relaxed age limit. Planning remaining attempts alongside age is essential for a realistic preparation timeline.",
    ],
  },
  {
    id: "calculation",
    title: "How UPSC Age is Calculated",
    content: [
      "UPSC does not use your date of application or the Prelims exam date for age. It uses 1 August of the year of the Preliminary Examination. Our IAS age calculator computes years, months, and days exactly as on that date using your date of birth.",
      "For UPSC CSE 2026, enter DOB and select 2026 — your displayed age will be as on 1 August 2026. This matches how coaching institutes and the UPSC notification describe eligibility by DOB.",
    ],
  },
  {
    id: "criteria",
    title: "UPSC Eligibility Criteria",
    content: [
      "Beyond age and attempts, candidates need a bachelor's degree (or equivalent) from a recognized university. Nationality, physical standards for specific services, and category certificates (OBC NCL, SC/ST, EWS, PwBD) must satisfy UPSC norms.",
      "This tool focuses on age and attempts — the most searched part of UPSC eligibility. Combine it with our syllabus, previous year papers, and mentorship programs on MentorsDaily for end-to-end preparation support.",
    ],
  },
];

function SEOContentComponent() {
  return (
    <article className="mx-auto max-w-4xl px-4 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="prose prose-lg max-w-none dark:prose-invert"
      >
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h2>
            {section.content.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </motion.div>
    </article>
  );
}

export const SEOContent = memo(SEOContentComponent);
