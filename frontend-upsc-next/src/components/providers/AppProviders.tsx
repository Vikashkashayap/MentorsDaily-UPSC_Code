"use client";

import { useEffect, type ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/legacy/contexts/ThemeContext";
import { setupAxiosInterceptor } from "@/legacy/api/axiosInterceptor";

let interceptorRegistered = false;

export default function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!interceptorRegistered) {
      setupAxiosInterceptor();
      interceptorRegistered = true;
    }
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </HelmetProvider>
  );
}
