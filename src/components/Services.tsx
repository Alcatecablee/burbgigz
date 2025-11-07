import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MonitorSpeaker, 
  Server, 
  ShieldCheck, 
  Network, 
  Settings, 
  Laptop,
  Timer,
  CheckCircle2 
} from "lucide-react";

const services = [
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Remote IT Support",
    description: "I fix most issues remotely - you save the callout fee, and I can usually have you up and running within the hour. From Sandton offices to Edenvale homes, I connect securely and you watch everything I do on your screen.",
    price: "From R120/session",
    features: ["Remote Diagnostics", "Software Installation", "System Updates", "Real-time Support"]
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Virus & Malware Removal",
    description: "I've cleaned hundreds of infected PCs across Johannesburg. Most malware comes from dodgy Chrome extensions or fake download buttons - I'll remove it and show you how to avoid it next time. Usually done remotely in under an hour.",
    price: "Remote R150 | On-site R350",
    features: ["Deep System Scan", "Malware Removal", "Antivirus Setup", "System Optimization"]
  },
  {
    icon: <MonitorSpeaker className="h-8 w-8" />,
    title: "Windows Reload & Setup",
    description: "Sometimes Windows is just too far gone to fix. I'll back up your files, reload Windows fresh, and get you set up with all your programs. I can guide you remotely or come to you in Lombardy East and surrounds.",
    price: "Remote R200 | On-site R450",
    features: ["Full OS Installation", "Driver Setup", "Essential Software", "Data Migration"]
  },
  {
    icon: <Network className="h-8 w-8" />,
    title: "Network & Connectivity",
    description: "Wi-Fi acting up? Printer refusing to print? I fix these daily - usually remotely in 20-30 minutes. No need to disconnect cables and haul your printer to a shop. I've sorted networks everywhere from Bedfordview flats to Kensington offices.",
    price: "Remote R120 | On-site R320",
    features: ["Wi-Fi Configuration", "Network Troubleshooting", "Printer Setup", "Connection Issues"]
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "System Optimization",
    description: "Your computer's probably not broken - it's just clogged up with years of updates, temp files, and programs you forgot you installed. I'll clean it up remotely, disable the junk that's slowing you down, and get it running smooth again.",
    price: "Remote R150 | On-site R350",
    features: ["Speed Optimization", "Startup Management", "Registry Cleanup", "Performance Monitoring"]
  },
  {
    icon: <Server className="h-8 w-8" />,
    title: "On-Site Hardware Service",
    description: "For hardware upgrades (SSD, RAM) or physical repairs, I'll come to you. I carry common parts in my car, so I can often upgrade your laptop the same day. Serving all Johannesburg suburbs - I've upgraded laptops from Greenstone to Fourways.",
    price: "R400 callout + service",
    features: ["SSD Installation", "RAM Upgrades", "Component Replacement", "Hardware Diagnostics"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-2">What I Do</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Most Fixes Done Remotely - I Come to You When Needed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            After 15+ years fixing computers across Johannesburg, I know that 80% of issues don't need a callout - I can fix them remotely while you watch. For hardware work like SSD upgrades, I'll come to you with the parts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group transition-all duration-300 bg-card border hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 cursor-pointer"
              tabIndex={0}
              role="article"
              aria-label={`${service.title} - ${service.price}`}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <Badge variant="secondary" className="text-sm font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {service.price}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2" role="list">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground mb-4">
            <Timer className="h-4 w-4" />
            <span>Remote sessions usually start within 15 minutes • R400 callout for on-site work • Serving all Johannesburg suburbs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
