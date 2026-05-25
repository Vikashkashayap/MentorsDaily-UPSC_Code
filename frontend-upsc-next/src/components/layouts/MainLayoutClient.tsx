"use client";

import dynamic from "next/dynamic";
import { Suspense, type ReactNode } from "react";
import RouteSkeleton from "@/legacy/components/utility/RouteSkeleton";

const MainLayout = dynamic(
  () => import("@/legacy/components/Layout/MainLayout"),
  { ssr: false, loading: () => <RouteSkeleton /> }
);

export default function MainLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <MainLayout>{children}</MainLayout>
    </Suspense>
  );
}
