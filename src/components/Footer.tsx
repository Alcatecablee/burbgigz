import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin,
  Shield,
  Clock 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="BurbGigz IT Services" className="h-8" />
            </div>
            <p className="text-muted-foreground">
              I provide professional IT services in Lombardy East and surrounding areas. 
              Fast, reliable, and affordable computer repairs since 2010.
            </p>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">30-Day Warranty on All Repairs</span>
            </div>
            <div className="space-y-1 pt-2 border-t">
              <p className="text-xs text-muted-foreground font-medium">Certified Technician</p>
              <p className="text-xs text-muted-foreground">CompTIA A+ & Network+</p>
              <p className="text-xs text-muted-foreground">15+ Years Experience</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-primary transition-colors">About Me</a></li>
              <li><a href="/remote" className="hover:text-primary transition-colors">Remote Support</a></li>
              <li><a href="/pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="/areas" className="hover:text-primary transition-colors">Service Areas</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/scam-awareness" className="hover:text-primary transition-colors text-warning">Avoid Scams</a></li>
            </ul>
            <div className="pt-4 border-t">
              <h4 className="font-semibold text-foreground text-sm mb-2">Related Sites</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://justc.live/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">JustC.live - Personal Portfolio</a></li>
                <li><a href="https://taxfy.co.za/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Taxfy - Tax Services</a></li>
                <li><a href="https://neurolint.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Neurolint - Development</a></li>
                <li><a href="https://superk53.co.za/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">SuperK53 - K53 Learner's Licence Tests</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">WhatsApp (Preferred)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Direct Call</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-warning" />
                <span className="text-muted-foreground">Email Support</span>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Service Areas</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 text-primary" />
                <span>Lombardy East</span>
                <Badge variant="secondary" className="text-xs">Primary</Badge>
              </div>
              <div className="flex justify-between"><span>Alexandra</span><span className="text-xs">NW • ~3 km</span></div>
              <div className="flex justify-between"><span>Lakeside</span><span className="text-xs">NE • ~3 km</span></div>
              <div className="flex justify-between"><span>Kew</span><span className="text-xs">Adjacent</span></div>
              <div className="flex justify-between"><span>Marlboro (Gautrain)</span><span className="text-xs">N • ~4 km</span></div>
              <div className="flex justify-between"><span>Greenstone Mall</span><span className="text-xs">E • ~10 min</span></div>
              <div className="flex justify-between"><span>Sandton</span><span className="text-xs">NW • ~6–8 km</span></div>
              <div className="flex justify-between"><span>Johannesburg CBD</span><span className="text-xs">W • ~14 km</span></div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Same-day service available</span>
              </div>
              <span>•</span>
              <span>Free quotes</span>
              <span>•</span>
              <span>Local & trusted</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {currentYear} BurbGigz IT Services. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
