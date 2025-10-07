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
        <div className="max-w-7xl mx-auto bg-background shadow-lg min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/remote" element={<Remote />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/about" element={<About />} />
            <Route path="/scam-awareness" element={<ScamAwareness />} />
            <Route path="/portal" element={<CustomerPortal />} />
            <Route path="/supabase-setup" element={<SupabaseSetup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <StickyCta />
        </div>
        <Toaster />
      </BrowserRouter>
    </div>
  </QueryClientProvider>
);

export default App;
