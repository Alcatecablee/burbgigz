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
import StickyCta from "@/components/StickyCta";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="bg-background">
      <BrowserRouter>
        <div className="max-w-7xl mx-auto bg-background shadow-lg min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/remote" element={<Remote />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/areas" element={<Areas />} />
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
