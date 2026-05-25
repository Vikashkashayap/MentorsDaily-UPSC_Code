"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/legacy/components/Navbar";
import MessageDisplay from "@/legacy/components/utility/MessageDisplay";

const Footer = dynamic(() => import("@/legacy/components/Footer"), {
  ssr: false,
});
const WatsupWidget = dynamic(
  () => import("@/legacy/pages/public/components/WatsupWidget"),
  { ssr: false }
);
const EnquiryWidget = dynamic(
  () => import("@/legacy/pages/public/EnquiryWidget"),
  { ssr: false }
);
const ContactForm = dynamic(
  () => import("@/legacy/pages/public/components/Form"),
  { ssr: false }
);

export default function PublicLayoutClient({
  children,
  showNavbar = true,
  showFooter = true,
}: {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}) {
  const pathname = usePathname();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      setIsFormOpen(false);
      const timerId = setTimeout(() => setIsFormOpen(true), 5000);
      return () => clearTimeout(timerId);
    }
    setIsFormOpen(false);
  }, [pathname, showNavbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <MessageDisplay />
      {showNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      {showFooter && (
        <Suspense
          fallback={<div className="min-h-[320px]" aria-hidden="true" />}
        >
          <Footer />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <WatsupWidget />
      </Suspense>
      <Suspense fallback={null}>
        <EnquiryWidget onClick={() => setIsFormOpen(true)} />
      </Suspense>
      {isFormOpen && (
        <Suspense fallback={null}>
          <ContactForm onClose={() => setIsFormOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
