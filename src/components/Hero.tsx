import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      
      <div className="container relative px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="inline-flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>Serving Lombardy East & Surrounds</span>
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Expert Remote Support
              <span className="text-primary block">& On-Site IT Services</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Professional helpdesk technician with remote troubleshooting expertise using secure remote tools.
              Quick fixes from anywhere, with on-site support when needed. Serving Lombardy East, Johannesburg and nearby suburbs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8"
              >
                <a href="#contact">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Remote Session
                </a>
              </Button>
              <Button asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <a href="#services">
                  <Shield className="mr-2 h-5 w-5" />
                  View Services
                </a>
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>Remote Support Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>Professional Helpdesk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>Secure Remote Tools</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-medium">
              <img 
                src={heroImage} 
                alt="Professional IT technician repairing laptop" 
                className="w-full h-auto object-cover"
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
