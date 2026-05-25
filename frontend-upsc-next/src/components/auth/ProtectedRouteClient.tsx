"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserData, isAuthenticated } from "@/legacy/utils/authUtils";
import RouteSkeleton from "@/legacy/components/utility/RouteSkeleton";

export default function ProtectedRouteClient({
  children,
  allowedRoles = [] as string[],
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">(
    "loading"
  );

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(`/login?from=${encodeURIComponent(pathname ?? "/")}`);
      setStatus("denied");
      return;
    }
    try {
      const userData = getUserData();
      if (!userData) {
        router.replace("/login");
        setStatus("denied");
        return;
      }
      if (allowedRoles.length === 0) {
        setStatus("allowed");
        return;
      }
      if (allowedRoles.includes(userData.role)) {
        setStatus("allowed");
        return;
      }
      if (userData.role === "admin" || userData.role === "super_admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/home");
      }
      setStatus("denied");
    } catch {
      router.replace("/login");
      setStatus("denied");
    }
  }, [router, pathname, allowedRoles]);

  if (status === "loading") return <RouteSkeleton />;
  if (status !== "allowed") return null;
  return <>{children}</>;
}
