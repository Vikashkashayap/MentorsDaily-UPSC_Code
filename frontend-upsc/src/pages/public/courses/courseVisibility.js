export const COURSES_UPDATED_EVENT = "mentorsdaily:courses-updated";

export function notifyCoursesUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(COURSES_UPDATED_EVENT));
  }
}

export function slugFromNavPath(path = "") {
  return String(path).replace(/^\//, "").trim().toLowerCase();
}

/** Keep nav item only when an active course exists for that landing path slug. */
export function filterNavItemsByActiveCourses(items, activeSlugs) {
  if (!activeSlugs) return [];
  if (!(activeSlugs instanceof Set) || activeSlugs.size === 0) return [];
  return items.filter((item) => activeSlugs.has(slugFromNavPath(item.path)));
}

export function unwrapCourseList(res) {
  const inner = res?.data;
  if (Array.isArray(inner)) return inner;
  if (Array.isArray(inner?.data)) return inner.data;
  return [];
}

export function buildActiveCourseSlugSet(courses = []) {
  return new Set(
    courses
      .filter((c) => c?.isActive !== false)
      .map((c) => String(c?.slug ?? "").trim().toLowerCase())
      .filter(Boolean)
  );
}
