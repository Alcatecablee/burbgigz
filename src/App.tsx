import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Remote from "./pages/Remote";
import Pricing from "./pages/Pricing";
import Booking from "./pages/Booking";
import Areas from "./pages/Areas";
import Sandton from "./pages/areas/Sandton";
import Bedfordview from "./pages/areas/Bedfordview";
import Edenvale from "./pages/areas/Edenvale";
import Rosebank from "./pages/areas/Rosebank";
import Midrand from "./pages/areas/Midrand";
import { CustomerPortal } from "./components/CustomerPortal";
import SupabaseSetup from "./pages/SupabaseSetup";
import About from "./pages/About";
import ScamAwareness from "./pages/ScamAwareness";
import Header from "@/components/Header";
import StickyCta from "@/components/StickyCta";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="bg-background">
      <BrowserRouter>
        <ScrollToTop />
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg transition-all"
        >
          Skip to main content
        </a>
        <div className="max-w-7xl mx-auto bg-background shadow-lg min-h-screen">
          <Header />
          <main id="main-content" tabIndex={-1}>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/remote" element={<Remote />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/areas/sandton" element={<Sandton />} />
            <Route path="/areas/bedfordview" element={<Bedfordview />} />
            <Route path="/areas/edenvale" element={<Edenvale />} />
            <Route path="/areas/rosebank" element={<Rosebank />} />
            <Route path="/areas/midrand" element={<Midrand />} />
            <Route path="/about" element={<About />} />
            <Route path="/scam-awareness" element={<ScamAwareness />} />
            <Route path="/portal" element={<CustomerPortal />} />
            <Route path="/supabase-setup" element={<SupabaseSetup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </main>
          <StickyCta />
        </div>
        <Toaster />
      </BrowserRouter>
    </div>
  </QueryClientProvider>
);

export default App;
