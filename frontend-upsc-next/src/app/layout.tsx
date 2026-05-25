import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import AppProviders from "@/components/providers/AppProviders";
import SiteLayoutClient from "@/components/layouts/SiteLayoutClient";
import { organizationSchema, JsonLd } from "@/lib/seo/schema";
import { metadataForPath } from "@/lib/seo/pages";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  ...metadataForPath("/"),
  icons: {
    icon: [{ url: "/Logo/icon.png", type: "image/png" }],
    apple: [{ url: "/Logo/icon.png", type: "image/png" }],
    shortcut: ["/Logo/icon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased app-container`}>
        <JsonLd data={organizationSchema()} />
        <AppProviders>
          <SiteLayoutClient>
            <Suspense fallback={null}>{children}</Suspense>
          </SiteLayoutClient>
        </AppProviders>
      </body>
    </html>
  );
}
