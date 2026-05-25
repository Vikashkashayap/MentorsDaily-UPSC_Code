import { publicEnv } from "@/lib/env";

function stripHtml(html: unknown): string {
  return String(html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchPreparationBlogBySlug(slug: string) {
  try {
    const res = await fetch(
      `${publicEnv.apiUrl}/api/v1/preparation/by-slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json;
  } catch {
    return null;
  }
}

export async function fetchCurrentAffairBySlug(slug: string) {
  try {
    const res = await fetch(
      `${publicEnv.apiUrl}/api/v1/get-affairs?slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data ?? json;
    if (Array.isArray(data)) return data[0] ?? null;
    if (data?.data && Array.isArray(data.data)) return data.data[0] ?? null;
    return data;
  } catch {
    return null;
  }
}

export async function fetchCourseById(courseId: string) {
  try {
    const res = await fetch(
      `${publicEnv.apiUrl}/api/v1/course/${encodeURIComponent(courseId)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const inner = json?.data ?? json;
    if (inner?.data && typeof inner.data === "object") return inner.data;
    if (inner?._id || inner?.title) return inner;
    return null;
  } catch {
    return null;
  }
}

export async function fetchCourseBySlug(slug: string) {
  try {
    const res = await fetch(
      `${publicEnv.apiUrl}/api/v1/course/slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const inner = json?.data ?? json;
    if (inner?.data && typeof inner.data === "object") return inner.data;
    if (inner?._id || inner?.title) return inner;
    return null;
  } catch {
    return null;
  }
}

export async function fetchFreeResourceById(id: string) {
  try {
    const res = await fetch(
      `${publicEnv.apiUrl}/api/v1/get/free-resourse/${encodeURIComponent(id)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json;
  } catch {
    return null;
  }
}

export function buildCurrentAffairKeywords(affair: {
  title?: string;
  paperName?: string;
  subject?: string;
}): string {
  const parts = [
    "daily current affairs UPSC",
    affair.paperName ? `${affair.paperName} current affairs` : "",
    affair.subject ? `${affair.subject} UPSC` : "",
    stripHtml(affair.title),
    "MentorsDaily current affairs",
    "UPSC prelims current affairs",
    "UPSC mains current affairs",
  ].filter(Boolean);
  return parts.join(", ");
}

export function buildCourseKeywords(course: {
  title?: string;
  category?: string;
  description?: string;
}): string {
  const title = stripHtml(course.title);
  const category = stripHtml(course.category);
  return [
    title,
    category ? `${category} UPSC course` : "",
    "UPSC mentorship",
    "MentorsDaily course",
    "civil services coaching",
    "IAS preparation program",
  ]
    .filter(Boolean)
    .join(", ");
}

export function buildFreeResourceKeywords(resource: {
  title?: string;
  category?: string;
  subject?: string;
}): string {
  return [
    stripHtml(resource.title),
    resource.category ? `${resource.category} free UPSC material` : "",
    resource.subject ? `${resource.subject} study material` : "",
    "free UPSC resources",
    "MentorsDaily free study material",
  ]
    .filter(Boolean)
    .join(", ");
}

export { stripHtml };
