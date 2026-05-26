import { addMonths, addYears, differenceInDays, differenceInMonths, differenceInYears } from "date-fns";
import {
  categoryRules,
  getCutoffDate,
  MIN_AGE,
  type CategoryKey,
} from "./upscRules";

export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
}

export interface EligibilityResult {
  age: AgeBreakdown;
  ageOnCutoff: number;
  isEligible: boolean;
  isTooYoung: boolean;
  isTooOld: boolean;
  maxAgeAllowed: number;
  attemptsUsed: number;
  attemptsRemaining: number | "Unlimited";
  attemptsLimit: number | "Unlimited";
  eligibleTillYear: number | null;
  cutoffDate: Date;
  formattedAge: string;
  eligibilityMessage: string;
}

export interface TimelineYear {
  year: number;
  eligible: boolean;
  reason?: string;
}

export const formatAge = (age: AgeBreakdown): string =>
  `${age.years} Year${age.years !== 1 ? "s" : ""} ${age.months} Month${age.months !== 1 ? "s" : ""} ${age.days} Day${age.days !== 1 ? "s" : ""}`;

export const calculateAgeBreakdown = (
  dateOfBirth: Date,
  referenceDate: Date
): AgeBreakdown => {
  const years = differenceInYears(referenceDate, dateOfBirth);
  const afterYears = addYears(dateOfBirth, years);
  const months = differenceInMonths(referenceDate, afterYears);
  const afterMonths = addMonths(afterYears, months);
  const days = differenceInDays(referenceDate, afterMonths);

  return { years, months, days };
};

export const calculateEligibility = (
  dateOfBirth: Date,
  category: CategoryKey,
  examYear: number,
  attemptsUsed: number
): EligibilityResult => {
  const rules = categoryRules[category];
  const cutoffDate = getCutoffDate(examYear);
  const age = calculateAgeBreakdown(dateOfBirth, cutoffDate);
  const ageOnCutoff = age.years;

  const isTooYoung = ageOnCutoff < MIN_AGE;
  const isTooOld = ageOnCutoff > rules.maxAge;
  const hasAttemptsLeft =
    rules.attempts === Infinity || attemptsUsed < rules.attempts;

  const isEligible = !isTooYoung && !isTooOld && hasAttemptsLeft;

  const attemptsRemaining =
    rules.attempts === Infinity
      ? ("Unlimited" as const)
      : Math.max(0, rules.attempts - attemptsUsed);

  const attemptsLimit =
    rules.attempts === Infinity ? ("Unlimited" as const) : rules.attempts;

  let eligibilityMessage = "You are eligible for UPSC CSE";
  if (isTooYoung) {
    eligibilityMessage = `Minimum age is ${MIN_AGE} years as on 1 August ${examYear}`;
  } else if (isTooOld) {
    eligibilityMessage = `Age exceeds the ${rules.maxAge}-year limit for ${rules.shortLabel} category`;
  } else if (!hasAttemptsLeft) {
    eligibilityMessage = "You have exhausted all permitted attempts";
  }

  const eligibleTillYear = findEligibleTillYear(
    dateOfBirth,
    category,
    examYear,
    attemptsUsed
  );

  return {
    age,
    ageOnCutoff,
    isEligible,
    isTooYoung,
    isTooOld,
    maxAgeAllowed: rules.maxAge,
    attemptsUsed,
    attemptsRemaining,
    attemptsLimit,
    eligibleTillYear,
    cutoffDate,
    formattedAge: formatAge(age),
    eligibilityMessage,
  };
};

export const findEligibleTillYear = (
  dateOfBirth: Date,
  category: CategoryKey,
  startYear: number,
  attemptsUsed: number
): number | null => {
  const rules = categoryRules[category];
  let lastEligible: number | null = null;

  for (let year = startYear; year <= startYear + 20; year += 1) {
    const cutoff = getCutoffDate(year);
    const ageYears = calculateAgeBreakdown(dateOfBirth, cutoff).years;
    const withinAge = ageYears >= MIN_AGE && ageYears <= rules.maxAge;
    const withinAttempts =
      rules.attempts === Infinity || attemptsUsed < rules.attempts;

    if (withinAge && withinAttempts) {
      lastEligible = year;
    } else if (lastEligible !== null) {
      break;
    }
  }

  return lastEligible;
};

export const generateEligibilityTimeline = (
  dateOfBirth: Date,
  category: CategoryKey,
  examYear: number,
  attemptsUsed: number,
  span = 6
): TimelineYear[] => {
  const rules = categoryRules[category];

  return Array.from({ length: span }, (_, index) => {
    const year = examYear + index;
    const cutoff = getCutoffDate(year);
    const ageYears = calculateAgeBreakdown(dateOfBirth, cutoff).years;

    const withinAge = ageYears >= MIN_AGE && ageYears <= rules.maxAge;
    const withinAttempts =
      rules.attempts === Infinity || attemptsUsed < rules.attempts;
    const eligible = withinAge && withinAttempts;

    let reason: string | undefined;
    if (!withinAge && ageYears < MIN_AGE) {
      reason = `Below minimum age (${MIN_AGE})`;
    } else if (!withinAge) {
      reason = `Exceeds ${rules.maxAge}-year limit`;
    } else if (!withinAttempts) {
      reason = "No attempts remaining";
    }

    return { year, eligible, reason };
  });
};
