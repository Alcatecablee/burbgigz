import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-gradient-primary"></div>
          <span className="text-xl font-bold text-primary">BurbGigz</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
            Services
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </a>
          <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Phone className="mr-2 h-4 w-4" />
            <span className="hidden lg:inline">Call Now</span>
          </Button>
          <Button variant="default" size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
