/**
 * Sync admin course.basePrice / course.sellingPrice onto IMP detail landing pages.
 * Daily plan uses the course row; weekly uses fixed per-year list prices.
 */

/** Fixed weekly plan prices (50% off MRP) — independent of daily admin price. */
export const IMP_WEEKLY_PRICING_BY_YEAR = {
  "2027": { price: 30000, oldPrice: 60000 },
  "2028": { price: 55000, oldPrice: 110000 },
};

function deepClone(obj) {
  try {
    return structuredClone(obj);
  } catch {
    return JSON.parse(JSON.stringify(obj));
  }
}

export function getImpYearFromCourse(course) {
  const slug = String(course?.slug ?? "").toLowerCase().trim();
  const fromSlug = slug.match(/integrated-mentorship-(20\d{2})/);
  if (fromSlug) return fromSlug[1];

  const title = String(course?.title ?? "").toLowerCase();
  const fromTitle = title.match(/\b(20\d{2})\b/);
  return fromTitle ? fromTitle[1] : null;
}

export function formatInr(n) {
  if (n == null || n === "" || Number.isNaN(Number(n))) return "—";
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function discountPercent(selling, base) {
  const b = Number(base);
  const s = Number(selling);
  if (!Number.isFinite(b) || b <= 0 || !Number.isFinite(s)) return 0;
  return Math.round(((b - s) / b) * 100);
}

/** Keep trailing copy after "(N% off)" e.g. " — Early Bird Price". */
function saveLabelSuffix(existing) {
  if (typeof existing !== "string" || !existing.trim()) return "";
  const m = existing.match(/\)\s*(.+)$/);
  return m?.[1] ? ` ${m[1].trim()}` : "";
}

export function buildSaveLabel(selling, base, existingLabel) {
  const savings = Math.max(0, Number(base) - Number(selling));
  const pct = discountPercent(selling, base);
  if (pct <= 0 || savings <= 0) return typeof existingLabel === "string" ? existingLabel : "";
  const suffix = saveLabelSuffix(existingLabel);
  return `Save ${formatInr(savings)} (${pct}% off)${suffix}`;
}

function applyWeeklyPricing(ps, course) {
  if (!ps?.weekly) return;

  const year = getImpYearFromCourse(course);
  const fixed = year && IMP_WEEKLY_PRICING_BY_YEAR[year];
  if (fixed) {
    ps.weekly.price = fixed.price;
    ps.weekly.oldPrice = fixed.oldPrice;
    ps.weekly.saveLabel = buildSaveLabel(fixed.price, fixed.oldPrice, ps.weekly.saveLabel);
    return;
  }

  const defaultWeeklyPrice = Number(ps.weekly.price);
  const defaultWeeklyOld = Number(ps.weekly.oldPrice);
  if (Number.isFinite(defaultWeeklyPrice) && defaultWeeklyPrice > 0) {
    ps.weekly.saveLabel = buildSaveLabel(defaultWeeklyPrice, defaultWeeklyOld, ps.weekly.saveLabel);
  }
}

/**
 * @param {object} detail - merged IMP detail page object
 * @param {{ slug?: string, title?: string, basePrice?: number, sellingPrice?: number }} course
 */
export function applyCoursePricingToImpDetail(detail, course) {
  if (!detail || !course) return detail;

  const selling = Number(
    course.sellingPrice != null ? course.sellingPrice : course.basePrice
  );
  const base = Number(course.basePrice != null ? course.basePrice : selling);
  if (!Number.isFinite(selling) || selling < 0) return detail;

  const out = deepClone(detail);
  const ps = out.pricingSection;
  if (!ps) return out;

  if (ps.daily) {
    ps.daily.price = selling;
    ps.daily.oldPrice = base;
    ps.daily.saveLabel = buildSaveLabel(selling, base, ps.daily.saveLabel);
  }

  applyWeeklyPricing(ps, course);

  if (ps.comparisonHead) {
    ps.comparisonHead.midPrice = formatInr(selling);
    if (ps.weekly?.price != null) {
      ps.comparisonHead.rightPrice = formatInr(ps.weekly.price);
    }
  }

  const savings = Math.max(0, base - selling);
  if (out.announcement?.text && savings > 0) {
    out.announcement.text = out.announcement.text.replace(
      /save\s*₹[\d,\s]+/i,
      `save ${formatInr(savings)}`
    );
  }

  return out;
}

/** Resolve daily / weekly checkout amounts from a course document (mirrors frontend sync). */
export function resolveImpPlanAmountsFromCourse(course, defaultDaily, defaultWeekly) {
  const selling = Number(
    course?.sellingPrice != null ? course.sellingPrice : course?.basePrice
  );
  const base = Number(course?.basePrice != null ? course.basePrice : selling);
  if (!Number.isFinite(selling) || selling < 0) return null;

  const year = getImpYearFromCourse(course);
  const fixedWeekly = year && IMP_WEEKLY_PRICING_BY_YEAR[year];

  return {
    daily: selling,
    weekly: fixedWeekly ? fixedWeekly.price : Number(defaultWeekly) || selling,
    baseDaily: base,
    baseWeekly: fixedWeekly ? fixedWeekly.oldPrice : base,
  };
}
