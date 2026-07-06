function extractYear(course) {
  const text = `${course?.slug ?? ""} ${course?.title ?? ""} ${course?.category ?? ""}`;
  const match = text.match(/20(2[6-9]|3[0-2])/);
  return match ? Number(match[0]) : 9999;
}

export function courseGroup(course) {
  const slug = String(course?.slug ?? "").toLowerCase();
  const title = String(course?.title ?? "").toLowerCase();
  const combined = `${slug} ${title}`;

  const isImp =
    combined.includes("integrated mentorship") ||
    slug.startsWith("integrated-mentorship") ||
    slug.startsWith("imp-");

  if (isImp) return "imp";

  const isSuper5 =
    slug.includes("super-5") ||
    title.includes("super 5") ||
    title.includes("super5");

  if (isSuper5) return "super5";

  return "other";
}

/** IMP years from 2027 upward first, then earlier IMP years (e.g. 2026). */
function impYearRank(year) {
  if (year >= 2027 && year <= 2032) return year;
  if (year === 2026) return 2033;
  return 9998;
}

const GROUP_RANK = { imp: 0, super5: 1, other: 2 };

/** Sort: all IMP (2027 → 2032 → 2026), then Super 5 Batch, then remaining courses. */
export function sortMentorshipCourses(courses = []) {
  return [...courses].sort((a, b) => {
    const ga = courseGroup(a);
    const gb = courseGroup(b);
    if (GROUP_RANK[ga] !== GROUP_RANK[gb]) {
      return GROUP_RANK[ga] - GROUP_RANK[gb];
    }

    const yearA = extractYear(a);
    const yearB = extractYear(b);

    if (ga === "imp") {
      const rankA = impYearRank(yearA);
      const rankB = impYearRank(yearB);
      if (rankA !== rankB) return rankA - rankB;
    } else if (yearA !== yearB) {
      return yearA - yearB;
    }

    return String(a?.title ?? "").localeCompare(String(b?.title ?? ""), undefined, {
      sensitivity: "base",
    });
  });
}
