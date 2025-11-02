import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-tech.png";

const Hero = () => {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
      
      <div className="container relative px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <Badge variant="secondary" className="inline-flex items-center space-x-1 transition-colors">
              <MapPin className="h-3 w-3" />
              <span>Serving Lombardy East & Surrounds</span>
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight">
              Expert Remote Support
              <span className="text-primary block mt-2">& On-Site IT Services</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Professional helpdesk technician with remote troubleshooting expertise using secure remote tools.
              Quick fixes from anywhere, with on-site support when needed. Serving Lombardy East, Johannesburg and nearby suburbs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
              <Button asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 transition-all duration-300 text-base md:text-lg px-6 md:px-8 hover:scale-105 active:scale-95 hover:shadow-lg focus-ring-enhanced"
              >
                <a href="/remote" aria-label="Start a remote support session">
                  <Zap className="mr-2 h-5 w-5" aria-hidden="true" />
                  Start Remote Session
                </a>
              </Button>
              <Button asChild
                variant="outline"
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md focus-ring-enhanced"
              >
                <a href="#services" aria-label="View our IT services">
                  <Shield className="mr-2 h-5 w-5" aria-hidden="true" />
                  View Services
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground pt-2">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                <span>Remote Support Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">Professional Helpdesk</span>
                <span className="sm:hidden">Pro Helpdesk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                <span>Secure Remote Tools</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right duration-700">
            <div className="relative rounded-xl overflow-hidden shadow-medium hover:shadow-lg transition-shadow duration-300">
              <img 
                src={heroImage} 
                alt="Professional IT support technician providing remote helpdesk services" 
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
