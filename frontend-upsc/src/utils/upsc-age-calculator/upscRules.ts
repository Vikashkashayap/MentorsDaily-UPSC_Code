export type CategoryKey = "GENERAL" | "EWS" | "OBC" | "SCST" | "PWBD";

export interface CategoryRule {
  maxAge: number;
  attempts: number;
  label: string;
  shortLabel: string;
}

export const MIN_AGE = 21;

export const categoryRules: Record<CategoryKey, CategoryRule> = {
  GENERAL: {
    maxAge: 32,
    attempts: 6,
    label: "General (Unreserved)",
    shortLabel: "General",
  },
  EWS: {
    maxAge: 32,
    attempts: 6,
    label: "Economically Weaker Section (EWS)",
    shortLabel: "EWS",
  },
  OBC: {
    maxAge: 35,
    attempts: 9,
    label: "Other Backward Classes (OBC)",
    shortLabel: "OBC",
  },
  SCST: {
    maxAge: 37,
    attempts: Infinity,
    label: "Scheduled Caste / Scheduled Tribe (SC/ST)",
    shortLabel: "SC/ST",
  },
  PWBD: {
    maxAge: 42,
    attempts: 9,
    label: "Persons with Benchmark Disability (PwBD)",
    shortLabel: "PwBD",
  },
};

export const CATEGORY_OPTIONS = Object.entries(categoryRules).map(
  ([value, rule]) => ({
    value: value as CategoryKey,
    label: rule.label,
  })
);

export const getCutoffDate = (examYear: number): Date =>
  new Date(examYear, 7, 1); // 1 August (month index 7)

export const getExamYearOptions = (baseYear = new Date().getFullYear()) =>
  Array.from({ length: 8 }, (_, i) => baseYear + i);

export const isValidCategory = (value: string): value is CategoryKey =>
  value in categoryRules;
