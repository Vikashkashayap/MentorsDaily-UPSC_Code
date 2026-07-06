/** Public URL slugs and nav metadata for Super 5 Batch courses. */
export const SUPER5_BATCH_SLUGS = [
  "super-5-batch-2027",
  "super-5-batch-2028",
];

export const SUPER5_BATCH_NAV_ITEMS = [
  {
    path: "/super-5-batch-2027",
    label: "Super 5 Batch 2027",
    timeline: "Max 5",
    dotClass: "bg-orange-500",
    hoverClass: "hover:bg-orange-50 hover:text-orange-700",
    badgeClass: "bg-orange-100 text-orange-700",
    mobileAccentClass: "bg-orange-50 border-orange-100",
  },
  {
    path: "/super-5-batch-2028",
    label: "Super 5 Batch 2028",
    timeline: "Max 5",
    dotClass: "bg-fuchsia-500",
    hoverClass: "hover:bg-fuchsia-50 hover:text-fuchsia-700",
    badgeClass: "bg-fuchsia-100 text-fuchsia-700",
    mobileAccentClass: "bg-fuchsia-50 border-fuchsia-100",
  },
];

export function isSuper5BatchSlug(slug = "") {
  return SUPER5_BATCH_SLUGS.includes(String(slug).trim().toLowerCase());
}

export function courseLandingPath(slug = "") {
  const raw = String(slug ?? "").trim();
  if (!raw) return null;
  return `/${encodeURIComponent(raw)}`;
}
