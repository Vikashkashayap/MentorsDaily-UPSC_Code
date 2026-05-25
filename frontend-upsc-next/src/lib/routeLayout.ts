export type SiteLayoutKind =
  | "public"
  | "public-no-footer"
  | "protected"
  | "protected-admin"
  | "none";

const PROTECTED_USER_PREFIXES = [
  "/home",
  "/ask",
  "/study/",
  "/library",
  "/mcq",
  "/pyqs",
  "/my-tests",
  "/answer-evaluation",
  "/mains-pyqs",
  "/my-progress",
  "/help-support",
  "/profile",
] as const;

/** Paths that use PublicLayoutClient without footer. */
const PUBLIC_NO_FOOTER = ["/current-affairs/"] as const;

export function getSiteLayoutKind(pathname: string): SiteLayoutKind {
  if (!pathname) return "public";

  if (pathname.startsWith("/admin")) {
    return "protected-admin";
  }

  for (const prefix of PROTECTED_USER_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(prefix)) {
      return "protected";
    }
  }

  for (const prefix of PUBLIC_NO_FOOTER) {
    if (pathname.startsWith(prefix) && pathname !== "/current-affairs") {
      return "public-no-footer";
    }
  }

  return "public";
}
