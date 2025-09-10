import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md border border-border"></div>
          <span className="text-xl font-bold text-primary">BurbGigz</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          <Link to="/remote" className="text-sm font-medium hover:text-primary transition-colors">Remote</Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          <Link to="/booking" className="text-sm font-medium hover:text-primary transition-colors">Booking</Link>
          <Link to="/areas" className="text-sm font-medium hover:text-primary transition-colors">Areas</Link>
          <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:flex">
            <a href="tel:+27670494876">
              <Phone className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline">Call Now</span>
            </a>
          </Button>
          <Button asChild variant="default" size="sm" className="transition-all duration-300">
            <a href="https://wa.me/27670494876" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
