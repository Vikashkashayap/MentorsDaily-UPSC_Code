import { useState } from "react";
import { Link } from "react-router-dom";

function isExternalUrl(url = "") {
  return /^https?:\/\//i.test(url);
}

function BannerLink({ url, linkText, className, children }) {
  if (!url) {
    return <span className={className}>{children}</span>;
  }

  if (isExternalUrl(url)) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        {linkText ? (
          <span className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-yellow-300 group-hover:gap-2 transition-all flex-shrink-0">
            {linkText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        ) : null}
      </a>
    );
  }

  return (
    <Link to={url} className={className}>
      {children}
      {linkText ? (
        <span className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-yellow-300 group-hover:gap-2 transition-all flex-shrink-0">
          {linkText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      ) : null}
    </Link>
  );
}

export default function SiteBannerBar({
  banner,
  variant = "top",
  storageKey,
}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (!storageKey || typeof window === "undefined") return true;
    return sessionStorage.getItem(storageKey) !== "1";
  });

  if (!banner?.enabled || !banner?.message || !isVisible) return null;

  const isTop = variant === "top";
  const wrapperClass = isTop
    ? "relative bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white border-b border-white/10"
    : "relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white border-b border-white/10";

  const badgeClass = isTop
    ? "inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-yellow-400/20 border border-yellow-300/30 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide text-yellow-200 flex-shrink-0"
    : "inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/15 border border-white/25 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white flex-shrink-0";

  const pulseClass = isTop ? "bg-yellow-300" : "bg-white";

  const handleDismiss = (event) => {
    event.stopPropagation();
    setIsVisible(false);
    if (storageKey) {
      sessionStorage.setItem(storageKey, "1");
    }
  };

  const handleClick = () => {
    if (!banner.linkUrl) return;
    if (isExternalUrl(banner.linkUrl)) {
      window.open(banner.linkUrl, "_blank", "noopener,noreferrer");
    }
  };

  const content = (
    <span className="inline-flex items-center gap-3 whitespace-nowrap">
      {banner.badgeText ? (
        <span className={badgeClass}>
          <span className={`w-1.5 h-1.5 ${pulseClass} rounded-full animate-pulse`} />
          {banner.badgeText}
        </span>
      ) : null}
      <span className="text-sm sm:text-[15px] font-semibold text-white/95">
        {banner.message}
      </span>
      {banner.linkText ? (
        <span className="inline-flex items-center gap-1 text-sm font-bold text-yellow-300">
          {banner.linkText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      ) : null}
    </span>
  );

  const marqueeSegmentClass =
    "inline-flex items-center shrink-0 px-10 sm:px-16";

  const renderMarqueeSegment = (keySuffix = "") => {
    const segment = (
      <span className={`${marqueeSegmentClass} group`}>{content}</span>
    );

    if (!banner.linkUrl) return <span key={keySuffix}>{segment}</span>;

    if (isExternalUrl(banner.linkUrl)) {
      return (
        <a
          key={keySuffix}
          href={banner.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${marqueeSegmentClass} group hover:opacity-90 transition-opacity`}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={keySuffix}
        to={banner.linkUrl}
        className={`${marqueeSegmentClass} group hover:opacity-90 transition-opacity`}
      >
        {content}
      </Link>
    );
  };

  if (!isTop) {
    return (
      <div className={wrapperClass}>
        <div className="relative w-full overflow-hidden py-2.5">
          <div className="site-banner-marquee flex w-max animate-slide-right-to-left hover:[animation-play-state:paused]">
            {renderMarqueeSegment("a")}
            {renderMarqueeSegment("b")}
            {renderMarqueeSegment("c")}
            {renderMarqueeSegment("d")}
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-orange-700 to-transparent" />

          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Dismiss announcement"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  const staticContent = (
    <>
      {banner.badgeText ? (
        <span className={badgeClass}>
          <span className={`w-1.5 h-1.5 ${pulseClass} rounded-full animate-pulse`} />
          {banner.badgeText}
        </span>
      ) : null}
      <span className="text-sm sm:text-[15px] font-semibold text-white/95 group-hover:text-white transition-colors truncate">
        {banner.message}
      </span>
    </>
  );

  return (
    <div className={wrapperClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {banner.linkUrl && !isExternalUrl(banner.linkUrl) ? (
            <BannerLink
              url={banner.linkUrl}
              linkText={banner.linkText}
              className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-left group min-w-0"
            >
              {staticContent}
            </BannerLink>
          ) : (
            <button
              type="button"
              onClick={handleClick}
              className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-left group min-w-0"
            >
              {staticContent}
              {banner.linkText && banner.linkUrl && isExternalUrl(banner.linkUrl) ? (
                <span className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-yellow-300 group-hover:gap-2 transition-all flex-shrink-0">
                  {banner.linkText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              ) : null}
            </button>
          )}

          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Dismiss announcement"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
