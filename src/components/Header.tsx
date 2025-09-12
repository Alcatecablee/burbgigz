import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Settings className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xl font-bold text-primary">BurbGigz</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/remote" className="text-sm font-medium hover:text-primary transition-colors">
            Remote Support
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/areas" className="text-sm font-medium hover:text-primary transition-colors">
            Service Areas
          </Link>
          <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button asChild variant="outline" size="sm" className="hidden sm:flex">
            <a href="tel:+27670494876">
              <Phone className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline">Call</span>
            </a>
          </Button>
          <Button asChild size="sm" className="bg-success hover:bg-success/90 text-white">
            <Link to="/booking">
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
