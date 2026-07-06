import { useCallback, useEffect, useState } from "react";
import { getCourses, clearCoursesCache } from "../api/coreService";
import {
  buildActiveCourseSlugSet,
  COURSES_UPDATED_EVENT,
  unwrapCourseList,
} from "../pages/public/courses/courseVisibility";

export function useActiveCourseSlugs() {
  const [activeSlugs, setActiveSlugs] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const res = await getCourses({ limit: 100, page: 1 });
      const list = unwrapCourseList(res);
      setActiveSlugs(buildActiveCourseSlugSet(list));
    } catch {
      setActiveSlugs(new Set());
    }
  }, []);

  useEffect(() => {
    refresh();
    const onUpdate = () => {
      clearCoursesCache();
      refresh();
    };
    window.addEventListener(COURSES_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(COURSES_UPDATED_EVENT, onUpdate);
  }, [refresh]);

  return activeSlugs;
}
