import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="BurbGigz IT Services" className="h-8" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
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
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link to="/portal">
              Customer Portal
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden sm:flex">
            <a href="tel:+27670494876">
              <PhoneCall className="mr-2 h-4 w-4" />
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
