import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  HardDrive, 
  Shield, 
  Wifi, 
  Wrench, 
  Smartphone,
  Clock,
  CheckCircle 
} from "lucide-react";

const services = [
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Remote IT Support",
    description: "Professional troubleshooting via secure remote tools - fix issues from anywhere",
    price: "From R120/session",
    features: ["Remote Diagnostics", "Software Installation", "System Updates", "Real-time Support"]
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Virus & Malware Removal",
    description: "Complete system cleanup and protection (remote + on-site)",
    price: "Remote R150 | On-site R350",
    features: ["Deep System Scan", "Malware Removal", "Antivirus Setup", "System Optimization"]
  },
  {
    icon: <Monitor className="h-8 w-8" />,
    title: "Windows Reload & Setup",
    description: "Complete Windows reinstallation with remote guidance",
    price: "Remote R200 | On-site R450",
    features: ["Full OS Installation", "Driver Setup", "Essential Software", "Data Migration"]
  },
  {
    icon: <Wifi className="h-8 w-8" />,
    title: "Network & Connectivity",
    description: "Internet, Wi-Fi setup and troubleshooting via remote support",
    price: "Remote R120 | On-site R320",
    features: ["Wi-Fi Configuration", "Network Troubleshooting", "Printer Setup", "Connection Issues"]
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: "System Optimization",
    description: "Performance tuning and maintenance via remote connection",
    price: "Remote R150 | On-site R350",
    features: ["Speed Optimization", "Startup Management", "Registry Cleanup", "Performance Monitoring"]
  },
  {
    icon: <HardDrive className="h-8 w-8" />,
    title: "On-Site Hardware Service",
    description: "Physical repairs and upgrades (callout fee applies)",
    price: "R400 callout + service",
    features: ["SSD Installation", "RAM Upgrades", "Component Replacement", "Hardware Diagnostics"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-2">Our Services</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Remote-First IT Support & On-Site Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional helpdesk support using secure remote tools for remote troubleshooting.
            Most issues resolved without leaving your desk - on-site support when hardware work is needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 bg-gradient-card border-0">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {service.icon}
                  </div>
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {service.price}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground mb-4">
            <Clock className="h-4 w-4" />
            <span>Remote sessions start immediately • R400 callout for on-site • Professional helpdesk experience</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
