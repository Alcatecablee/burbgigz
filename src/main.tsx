import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme-provider";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals, initPerformanceObserver } from "./utils/webVitals";

// Initialize Core Web Vitals monitoring for 2025 SEO
if (typeof window !== 'undefined') {
  initWebVitals();
  initPerformanceObserver();
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider defaultTheme="system" storageKey="burbgigz-theme">
      <App />
    </ThemeProvider>
  </HelmetProvider>
);
