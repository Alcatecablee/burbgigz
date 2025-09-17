import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

// Core Web Vitals monitoring for 2025 SEO optimization
interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

// 2025 Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },      // Largest Contentful Paint
  INP: { good: 200, poor: 500 },        // Interaction to Next Paint (replaced FID in 2024)
  CLS: { good: 0.1, poor: 0.25 },       // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 },      // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }       // Time to First Byte
};

function getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metric as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(metric: WebVitalMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id
    });
  }

  // Send to analytics service (Google Analytics 4)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta
      }
    });
  }

  // Optional: Send to custom analytics endpoint
  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      url: window.location.href,
      timestamp: Date.now()
    })
  }).catch(() => {
    // Silently fail if analytics endpoint is not available
  });
}

export function initWebVitals() {
  // Monitor 2025 Core Web Vitals
  
  // Largest Contentful Paint (LCP) - Loading performance
  onLCP((metric) => {
    const rating = getRating('LCP', metric.value);
    sendToAnalytics({ ...metric, rating } as WebVitalMetric);
  });

  // Interaction to Next Paint (INP) - Responsiveness (replaced FID)
  onINP((metric) => {
    const rating = getRating('INP', metric.value);
    sendToAnalytics({ ...metric, rating } as WebVitalMetric);
  });

  // Cumulative Layout Shift (CLS) - Visual stability
  onCLS((metric) => {
    const rating = getRating('CLS', metric.value);
    sendToAnalytics({ ...metric, rating } as WebVitalMetric);
  });

  // Additional performance metrics
  
  // First Contentful Paint (FCP) - Loading performance
  onFCP((metric) => {
    const rating = getRating('FCP', metric.value);
    sendToAnalytics({ ...metric, rating } as WebVitalMetric);
  });

  // Time to First Byte (TTFB) - Server response time
  onTTFB((metric) => {
    const rating = getRating('TTFB', metric.value);
    sendToAnalytics({ ...metric, rating } as WebVitalMetric);
  });

  // Note: FID (First Input Delay) has been replaced by INP (Interaction to Next Paint) in 2024
}

// Performance observer for additional insights
export function initPerformanceObserver() {
  if ('PerformanceObserver' in window) {
    // Monitor long tasks (tasks > 50ms)
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`Long task detected: ${entry.duration}ms`, entry);
          
          // Send to analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'long_task', {
              value: Math.round(entry.duration),
              event_category: 'Performance',
              event_label: entry.name || 'unknown'
            });
          }
        }
      }
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Longtask API not supported
    }

    // Monitor layout shifts
    const layoutShiftObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as any).hadRecentInput) continue;
        
        const value = (entry as any).value;
        if (value > 0.1) {
          console.warn(`Significant layout shift: ${value}`, entry);
        }
      }
    });

    try {
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Layout shift API not supported
    }
  }
}

// Export thresholds for UI components
export { THRESHOLDS };

// Utility to get current performance score
export function getPerformanceScore(): Promise<number> {
  return new Promise((resolve) => {
    // Simple performance scoring based on key metrics
    let score = 100;
    let metricsCollected = 0;
    const targetMetrics = 3; // LCP, INP, CLS

    const checkComplete = () => {
      metricsCollected++;
      if (metricsCollected >= targetMetrics) {
        resolve(Math.max(0, Math.min(100, score)));
      }
    };

    onLCP((metric) => {
      if (metric.value > THRESHOLDS.LCP.poor) score -= 30;
      else if (metric.value > THRESHOLDS.LCP.good) score -= 15;
      checkComplete();
    });

    onINP((metric) => {
      if (metric.value > THRESHOLDS.INP.poor) score -= 30;
      else if (metric.value > THRESHOLDS.INP.good) score -= 15;
      checkComplete();
    });

    onCLS((metric) => {
      if (metric.value > THRESHOLDS.CLS.poor) score -= 40;
      else if (metric.value > THRESHOLDS.CLS.good) score -= 20;
      checkComplete();
    });

    // Fallback timeout
    setTimeout(() => resolve(score), 5000);
  });
}