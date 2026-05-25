"use client";

import NextLink from "next/link";
import {
  useRouter,
  usePathname,
  useParams as useNextParams,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import {
  forwardRef,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  type ComponentProps,
  type AnchorHTMLAttributes,
} from "react";

type SetSearchParamsOptions = { replace?: boolean };

type SetSearchParamsArg =
  | URLSearchParams
  | Record<string, string>
  | ((prev: URLSearchParams) => URLSearchParams);

/** Drop-in replacement for react-router `useNavigate`. */
export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (
      to: string | number,
      options?: { replace?: boolean; state?: unknown }
    ) => {
      void options?.state;
      if (typeof to === "number") {
        if (to < 0) router.back();
        else router.forward();
        return;
      }
      startTransition(() => {
        if (options?.replace) router.replace(to);
        else router.push(to);
      });
    },
    [router]
  );
}

/** Drop-in replacement for react-router `useLocation`. */
export function useLocation() {
  const pathname = usePathname() ?? "/";
  const searchParams = useNextSearchParams();
  const search = searchParams?.toString()
    ? `?${searchParams.toString()}`
    : "";
  return {
    pathname,
    search,
    hash: "",
    state: null as unknown,
    key: "default",
  };
}

export function useParams<
  T extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >,
>() {
  return useNextParams() as T;
}

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: string;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, href, children, ...props },
  ref
) {
  const destination = to ?? href ?? "/";
  const { prefetch, ...rest } = props;
  return (
    <NextLink
      ref={ref}
      href={destination}
      prefetch={prefetch ?? true}
      {...rest}
    >
      {children}
    </NextLink>
  );
});

export function Navigate({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) {
  const router = useRouter();
  useEffect(() => {
    startTransition(() => {
      if (replace) router.replace(to);
      else router.push(to);
    });
  }, [to, replace, router]);
  return null;
}

export { usePathname };

/**
 * React Router–compatible API: returns [searchParams, setSearchParams].
 * Next.js `useSearchParams()` returns only the params object, not a tuple.
 */
export function useSearchParams(): [
  URLSearchParams,
  (next: SetSearchParamsArg, options?: SetSearchParamsOptions) => void,
] {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const nextParams = useNextSearchParams();

  const searchParams = useMemo(
    () => new URLSearchParams(nextParams?.toString() ?? ""),
    [nextParams]
  );

  const setSearchParams = useCallback(
    (arg: SetSearchParamsArg, options?: SetSearchParamsOptions) => {
      let params: URLSearchParams;
      if (typeof arg === "function") {
        params = arg(new URLSearchParams(nextParams?.toString() ?? ""));
      } else if (arg instanceof URLSearchParams) {
        params = arg;
      } else {
        params = new URLSearchParams();
        for (const [key, value] of Object.entries(arg)) {
          if (value != null && value !== "") params.set(key, value);
        }
      }
      const qs = params.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      startTransition(() => {
        if (options?.replace) router.replace(href, { scroll: false });
        else router.push(href, { scroll: false });
      });
    },
    [router, pathname, nextParams]
  );

  return [searchParams, setSearchParams];
}

type NavLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  to: string;
  className?: string | ((args: { isActive: boolean }) => string);
};

export function NavLink({ to, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname() ?? "";
  const isActive =
    pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));
  const resolvedClass =
    typeof className === "function" ? className({ isActive }) : className;
  const { prefetch, ...rest } = props;
  return (
    <NextLink href={to} className={resolvedClass} prefetch={prefetch ?? true} {...rest}>
      {children}
    </NextLink>
  );
}
