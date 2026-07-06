function deepClone(obj) {
  try {
    return structuredClone(obj);
  } catch {
    return JSON.parse(JSON.stringify(obj));
  }
}

const SUPER5_CARD_FEATURES = [
  "All NCERTs & Standard Books Provided",
  "1 Mentor for Max 5 Students — Never More",
  "Daily 1:1 Personalized Mentorship Sessions & Study Targets",
  "AI Powered Student Dashboard",
  "Psychologist Support Sessions",
  "Prelims + Mains Test Series",
];

function normalizeFeatureText(text = "") {
  return String(text)
    .replace(/Biweekly\s+/gi, "")
    .replace(/Weekly\s+1:1/gi, "Daily 1:1")
    .replace(/Weekly\s+Modular/gi, "Modular")
    .trim();
}

function shouldDropFeature(text = "") {
  const t = text.toLowerCase();
  if (t.includes("daily")) return false;
  return (
    t.includes("weekly") ||
    t.includes("biweekly") ||
    t.includes("monthly psychologist")
  );
}

function buildSuper5PricingFeatures(features) {
  if (!Array.isArray(features)) return [];
  const mapped = features
    .filter((f) => !shouldDropFeature(f.text))
    .map((f) => ({ ...f, text: normalizeFeatureText(f.text) }));

  if (!mapped.some((f) => /max 5|5 students/i.test(f.text))) {
    mapped.splice(1, 0, {
      ok: true,
      cls: "orange",
      text: "1 Mentor for Max 5 Students — Never More",
      highlight: true,
    });
  }
  return mapped;
}

function updatePerks(perks) {
  if (!Array.isArray(perks)) return perks;
  const next = perks.map((p) => {
    if (/1:1 Dedicated Mentor|Max \d+ Students/i.test(p)) return "1 Mentor : Max 5 Students";
    return p;
  });
  if (!next.some((p) => /Max 5/i.test(p))) {
    next[0] = "1 Mentor : Max 5 Students";
  }
  return next;
}

/** Apply Super 5 Batch copy when weekly plan is hidden (super-5-batch-* slugs). */
export function applySuper5BatchDetailOverrides(detail, year) {
  if (!detail || !year) return detail;
  const d = deepClone(detail);
  const batchLabel = `Super 5 Batch ${year}`;

  if (d.seo) {
    d.seo.title = `${batchLabel} – Integrated UPSC Mentorship | MentorsDaily`;
    d.seo.description = `Join MentorsDaily ${batchLabel} — daily 1:1 mentorship with 1 mentor for a maximum of 5 students. Complete UPSC preparation from basics to interview.`;
  }

  if (d.hero) {
    d.hero.cardTitle = batchLabel;
    d.hero.cardSubtitle = "1 Mentor for Max 5 Students · Daily 1:1 Sessions";
    d.hero.cardBannerTitle = batchLabel.toUpperCase();
    d.hero.cardListingTitle = batchLabel;
    d.hero.perks = updatePerks(d.hero.perks);
    d.hero.cardFeatures = SUPER5_CARD_FEATURES.slice();
    d.hero.enrollCta = "Enroll Now → Secure Your Seat";
  }

  if (Array.isArray(d.trustBar)) {
    d.trustBar = d.trustBar.map((t) =>
      /Max \d+|Students Per Mentor/i.test(t.lbl)
        ? { ...t, num: "Max 5", lbl: "Students Per Mentor" }
        : t
    );
  }

  if (d.pricingSection?.daily) {
    d.pricingSection.tag = "Super 5 Batch";
    d.pricingSection.title = `Exclusive ${batchLabel}`;
    d.pricingSection.sub =
      "Daily 1:1 mentorship with maximum personal attention — only 5 students per mentor, never more.";
    d.pricingSection.toggleHint = "";
    d.pricingSection.daily.name = batchLabel;
    d.pricingSection.daily.tagline = "Daily sessions · 1 mentor for max 5 students";
    d.pricingSection.daily.popularRibbon = "Super 5";
    d.pricingSection.daily.cta = "Enroll in Super 5 Batch →";
    d.pricingSection.daily.features = buildSuper5PricingFeatures(d.pricingSection.daily.features);
  }

  return d;
}

export function extractYearFromSlug(slug = "") {
  return String(slug).match(/20\d{2}/)?.[0] || "";
}
