"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { getSiteLayoutKind } from "@/lib/routeLayout";
import PublicLayoutClient from "@/components/layouts/PublicLayoutClient";
import MainLayoutClient from "@/components/layouts/MainLayoutClient";
import ProtectedRouteClient from "@/components/auth/ProtectedRouteClient";

/**
 * Keeps Navbar / side nav mounted across route changes (same as React Router layout routes).
 * Page files should render only route content — not wrap PublicLayoutClient again.
 */
export default function SiteLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const kind = getSiteLayoutKind(pathname);

  switch (kind) {
    case "protected-admin":
      return (
        <ProtectedRouteClient allowedRoles={["admin", "super_admin"]}>
          <MainLayoutClient>{children}</MainLayoutClient>
        </ProtectedRouteClient>
      );
    case "protected":
      return (
        <ProtectedRouteClient>
          <MainLayoutClient>{children}</MainLayoutClient>
        </ProtectedRouteClient>
      );
    case "public-no-footer":
      return (
        <PublicLayoutClient showFooter={false}>{children}</PublicLayoutClient>
      );
    case "public":
      return (
        <PublicLayoutClient showFooter={true}>{children}</PublicLayoutClient>
      );
    default:
      return <>{children}</>;
  }
}
