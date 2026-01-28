import React, { useState } from 'react';

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
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      <img
        src={src}
        alt={alt || ''}
        className={`${isLoading ? 'hidden' : ''} ${className}`}
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
    </>
  );
};

export default OptimizedImage;

