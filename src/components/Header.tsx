import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/remote", label: "Remote Support" },
    { to: "/pricing", label: "Pricing" },
    { to: "/scam-awareness", label: "Avoid Scams", warning: true },
    { to: "/areas", label: "Service Areas" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link 
          to="/" 
          className="hover:opacity-80 transition-opacity focus-visible:opacity-80"
          aria-label="BurbGigz IT Services - Home"
        >
          <img src="/logo.png" alt="BurbGigz IT Services" className="h-8" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-200 hover:after:w-full ${
                link.warning ? 'hover:text-warning' : 'hover:text-primary'
              } ${location.pathname === link.to ? 'text-primary after:w-full' : ''}`}
              aria-current={location.pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button asChild variant="ghost" size="sm" className="transition-all duration-200 hover:scale-105 focus-ring-enhanced">
            <Link to="/portal">
              Customer Portal
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="transition-all duration-200 hover:scale-105 focus-ring-enhanced">
            <a href="tel:+27670494876" aria-label="Call us at 067 049 4876">
              <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">Call</span>
            </a>
          </Button>
          <Button asChild size="sm" className="bg-success hover:bg-success/90 text-white transition-all duration-200 hover:scale-105 active:scale-95 focus-ring-enhanced">
            <Link to="/booking">
              Book Now
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button asChild size="sm" className="bg-success hover:bg-success/90 text-white transition-all duration-200 active:scale-95 focus-ring-enhanced">
            <Link to="/booking">
              Book
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className={`transition-all duration-200 active:scale-95 focus-ring-enhanced ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="md:hidden border-t bg-background animate-in slide-in-from-top-5 duration-300"
          aria-label="Mobile navigation"
          role="navigation"
        >
          <div className="container px-4 py-4 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={`block py-3 px-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-muted ${
                  link.warning ? 'hover:text-warning' : 'hover:text-primary'
                } ${location.pathname === link.to ? 'text-primary bg-primary/5' : ''}`}
                aria-current={location.pathname === link.to ? 'page' : undefined}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t space-y-2">
              <Link
                to="/portal"
                onClick={closeMobileMenu}
                className="block py-3 px-2 text-sm font-medium hover:text-primary hover:bg-muted transition-all duration-200 rounded-md"
              >
                Customer Portal
              </Link>
              <a
                href="tel:+27670494876"
                className="flex items-center py-3 px-2 text-sm font-medium hover:text-primary hover:bg-muted transition-all duration-200 rounded-md"
                aria-label="Call us at 067 049 4876"
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                Call 067 049 4876
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
