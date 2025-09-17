/**
 * Image Optimization Utilities for Core Web Vitals
 * Implements 2025 best practices for LCP, CLS, and performance
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  className?: string;
}

/**
 * Generate responsive image sizes for better performance
 */
export const generateImageSizes = (baseWidth: number) => {
  const breakpoints = [320, 640, 768, 1024, 1280, 1536];
  return breakpoints
    .filter(bp => bp <= baseWidth * 2) // Don't upscale beyond 2x
    .map(bp => `(max-width: ${bp}px) ${Math.min(bp, baseWidth)}px`)
    .concat(`${baseWidth}px`)
    .join(', ');
};

/**
 * Preload critical images for better LCP
 */
export const preloadCriticalImages = (imagePaths: string[]) => {
  if (typeof window === 'undefined') return;

  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with intersection observer
 */
export const createImageObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy');
            entry.target.classList.add('loaded');
          }
        }
      });
    },
    {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.1
    }
  );
};

/**
 * Optimize image format based on browser support
 */
export const getOptimalImageFormat = (originalSrc: string): string => {
  if (typeof window === 'undefined') return originalSrc;

  // Check for WebP support
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp', 0.5)
    .indexOf('data:image/webp') === 0;

  // Check for AVIF support
  const supportsAVIF = document.createElement('canvas')
    .toDataURL('image/avif', 0.5)
    .indexOf('data:image/avif') === 0;

  const extension = originalSrc.split('.').pop()?.toLowerCase();
  
  if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
    if (supportsAVIF) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    } else if (supportsWebP) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
  }

  return originalSrc;
};

/**
 * Performance-optimized image loading with error handling
 */
export const createOptimizedImageLoader = () => {
  return {
    loadImage: (src: string, priority: boolean = false): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        // Set loading priority
        if (priority) {
          img.fetchPriority = 'high';
          img.loading = 'eager';
        } else {
          img.loading = 'lazy';
        }

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        
        // Use optimized format
        img.src = getOptimalImageFormat(src);
      });
    },

    preloadImages: (sources: string[]) => {
      return Promise.allSettled(
        sources.map(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = getOptimalImageFormat(src);
          document.head.appendChild(link);
          return Promise.resolve();
        })
      );
    }
  };
};

/**
 * Monitor image loading performance
 */
export const trackImagePerformance = (imageName: string, startTime: number) => {
  if (typeof window === 'undefined' || !window.performance) return;

  const loadTime = performance.now() - startTime;
  
  // Report to Web Vitals if available
  if ('webVitals' in window) {
    console.log(`Image ${imageName} loaded in ${loadTime.toFixed(2)}ms`);
  }

  // You can integrate with analytics here
  // analytics.track('image_load_time', { name: imageName, duration: loadTime });
};

/**
 * CSS classes for optimized image loading states
 */
export const imageLoadingClasses = {
  loading: 'opacity-0 scale-105 blur-sm transition-all duration-300',
  loaded: 'opacity-100 scale-100 blur-0 transition-all duration-300',
  error: 'opacity-50 bg-gray-200 flex items-center justify-center'
};