/**
 * Performance-optimized Image component for Core Web Vitals
 * Implements lazy loading, format optimization, and proper sizing
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  OptimizedImageProps, 
  generateImageSizes, 
  getOptimalImageFormat,
  trackImagePerformance,
  imageLoadingClasses 
} from '@/utils/imageOptimization';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  loading = 'lazy',
  sizes,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef(performance.now());

  useEffect(() => {
    // Preload critical images
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimalImageFormat(src);
      document.head.appendChild(link);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    trackImagePerformance(alt || src, loadStartTime.current);
  };

  const handleError = () => {
    setHasError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  // Generate responsive sizes if width is provided but sizes isn't
  const responsiveSizes = sizes || (width ? generateImageSizes(width) : undefined);

  // Determine loading class
  const loadingClass = hasError 
    ? imageLoadingClasses.error 
    : isLoaded 
      ? imageLoadingClasses.loaded 
      : imageLoadingClasses.loading;

  if (hasError) {
    return (
      <div 
        className={`${imageLoadingClasses.error} ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load: ${alt}`}
      >
        <span className="text-xs text-gray-500">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={getOptimalImageFormat(src)}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={responsiveSizes}
      className={`${loadingClass} ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;