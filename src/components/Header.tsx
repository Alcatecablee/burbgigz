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
              className={`text-sm font-medium transition-colors ${
                link.warning ? 'hover:text-warning' : 'hover:text-primary'
              } ${location.pathname === link.to ? 'text-primary' : ''}`}
              aria-current={location.pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/portal">
              Customer Portal
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="tel:+27670494876" aria-label="Call us at 067 049 4876">
              <PhoneCall className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline">Call</span>
            </a>
          </Button>
          <Button asChild size="sm" className="bg-success hover:bg-success/90 text-white transition-colors">
            <Link to="/booking">
              Book Now
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button asChild size="sm" className="bg-success hover:bg-success/90 text-white">
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
            className="transition-transform"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden border-t bg-background transition-all duration-300 ease-out"
          aria-label="Mobile navigation"
        >
          <div className="container px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={`block py-2 text-sm font-medium transition-colors ${
                  link.warning ? 'hover:text-warning' : 'hover:text-primary'
                } ${location.pathname === link.to ? 'text-primary' : ''}`}
                aria-current={location.pathname === link.to ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t space-y-2">
              <Link
                to="/portal"
                onClick={closeMobileMenu}
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Customer Portal
              </Link>
              <a
                href="tel:+27670494876"
                className="flex items-center py-2 text-sm font-medium hover:text-primary transition-colors"
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
