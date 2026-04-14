import React, { useEffect, useMemo, useState } from 'react';

/**
 * OptimizedImage Component for better SEO and mobile performance
 * Features:
 * - Lazy loading
 * - Proper alt text
 * - Loading states
 * - Error handling
 * - Responsive sizing
 */
const OptimizedImage = ({
  src,
  webpSrc,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  sizes,
  srcSet,
  onError,
  onLoad,
  /** Prefer high for LCP; passed to the img as lowercase `fetchpriority` (React 18 DOM). */
  fetchPriority,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sourceKey = useMemo(() => `${String(src || "")}|${String(webpSrc || "")}`, [src, webpSrc]);

  useEffect(() => {
    // Reset local image state whenever source changes (e.g., after async API data arrives).
    setImageError(false);
    setIsLoading(Boolean(src || webpSrc));
  }, [sourceKey, src, webpSrc]);

  const handleError = (e) => {
    setImageError(true);
    setIsLoading(false);
    if (onError) onError(e);
  };

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  // If image fails to load, show placeholder
  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        aria-label={alt || 'Image not available'}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className={`bg-gray-200 animate-pulse ${className}`}
          aria-hidden="true"
        />
      )}
      <picture>
        {webpSrc ? <source srcSet={webpSrc} type="image/webp" /> : null}
        <img
          key={sourceKey}
          src={src}
          alt={alt || ''}
          className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          loading={loading}
          decoding={decoding}
          width={width}
          height={height}
          sizes={sizes}
          srcSet={srcSet}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      </picture>
    </>
  );
};

export default OptimizedImage;

