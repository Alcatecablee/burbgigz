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
    icon: <Monitor className="h-8 w-8" />,
    title: "Windows Reload & Setup",
    description: "Complete Windows reinstallation, driver updates, and software setup",
    price: "From R350",
    features: ["Full OS Installation", "Driver Setup", "Essential Software", "Data Backup"]
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Virus & Malware Removal",
    description: "Complete system cleanup and protection against malicious software",
    price: "From R250",
    features: ["Deep System Scan", "Malware Removal", "Antivirus Setup", "System Optimization"]
  },
  {
    icon: <HardDrive className="h-8 w-8" />,
    title: "Hardware Upgrades",
    description: "SSD upgrades, RAM installation, and component replacement",
    price: "From R200 + Parts",
    features: ["SSD Installation", "RAM Upgrades", "Screen Replacement", "Keyboard Repair"]
  },
  {
    icon: <Wifi className="h-8 w-8" />,
    title: "Network & Wi-Fi Setup",
    description: "Internet connection setup, router configuration, and troubleshooting",
    price: "From R300",
    features: ["Wi-Fi Configuration", "Network Troubleshooting", "Printer Setup", "Smart Device Setup"]
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: "General PC Repairs",
    description: "Diagnostics and repairs for all computer-related issues",
    price: "From R200",
    features: ["Hardware Diagnostics", "Software Issues", "Performance Tuning", "Data Recovery"]
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Remote Support",
    description: "Quick fixes and support via remote desktop connection",
    price: "From R150",
    features: ["Remote Diagnostics", "Software Installation", "System Updates", "Quick Troubleshooting"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-2">Our Services</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Professional IT Solutions for Your Home & Office
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From quick fixes to complete system overhauls, we handle all your technology needs 
            with expertise and care.
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
            <span>Same-day service available • Free quotes • 30-day warranty on all repairs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;