import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/currentAffairs")) {
    const rest = pathname.slice("/currentAffairs".length);
    const url = request.nextUrl.clone();
    url.pathname = `/current-affairs${rest || ""}`;
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/MentorshipCourses") {
    return NextResponse.redirect(
      new URL("/mentorship-courses", request.url),
      308
    );
  }

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length);
    return NextResponse.redirect(
      new URL(`/preparation-blog/${slug}`, request.url),
      308
    );
  }

  if (pathname === "/dashboard") {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url),
      308
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/currentAffairs/:path*",
    "/MentorshipCourses",
    "/blog/:path*",
    "/dashboard",
  ],
};
