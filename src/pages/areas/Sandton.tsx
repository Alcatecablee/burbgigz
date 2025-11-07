import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Zap, Phone, MessageCircle, CheckCircle2, Shield, Laptop, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/data/seoStructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Sandton = () => {
  const sandtonServiceSchema = serviceSchema({
    name: "IT Support Sandton",
    description: "Professional IT support in Sandton, Johannesburg. Remote troubleshooting from R120, on-site callouts from R520. Serving Sandton City, Nelson Mandela Square, and surrounding business districts.",
    price: "120",
    currency: "ZAR",
    provider: "BurbGigz IT Services",
    areaServed: ["Sandton", "Sandton City", "Nelson Mandela Square", "Johannesburg"]
  });

  const sandtonFAQSchema = faqSchema([
    {
      question: "Do you provide IT support in Sandton?",
      answer: "Yes! I provide both remote and on-site IT support throughout Sandton, including Sandton City, Nelson Mandela Square, and surrounding business areas. Remote support starts at R120, and on-site callouts are R520 (R400 base + R120 transport)."
    },
    {
      question: "How quickly can you respond to IT emergencies in Sandton?",
      answer: "For remote support, I can typically connect within 30 minutes during business hours. On-site callouts in Sandton are scheduled within 24 hours, with same-day service available for urgent issues."
    },
    {
      question: "What IT services do you offer in Sandton?",
      answer: "I offer complete IT support including remote troubleshooting, virus removal, SSD upgrades, network setup, printer configuration, Windows installations, and emergency support for both home offices and small businesses in Sandton."
    },
    {
      question: "Why does Sandton have a higher callout fee?",
      answer: "The R520 callout fee includes R400 base service plus R120 for transport from my Lombardy East base (7km distance). Remote support is always R120 regardless of location - perfect for most software issues."
    }
  ]);

  const sandtonBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/areas" },
    { name: "Sandton", url: "/areas/sandton" }
  ]);

  const structuredData = {
    "@graph": [sandtonServiceSchema, sandtonFAQSchema, sandtonBreadcrumbs]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="IT Support Sandton | Fast Remote & On-Site Computer Repair"
        description="Professional IT support in Sandton, Johannesburg. Remote fixes from R120, on-site from R520. Same-day service for Sandton City, Nelson Mandela Square & business district. Virus removal, SSD upgrades, network setup."
        keywords="IT support Sandton, computer repair Sandton, laptop repair Sandton, remote IT support Sandton, on-site IT Sandton, virus removal Sandton, SSD upgrade Sandton, network setup Sandton, printer setup Sandton, Sandton City IT support, urgent IT help Sandton, same day IT support Sandton"
        ogTitle="IT Support Sandton | Remote & On-Site Computer Repair from R120"
        ogDescription="Fast, affordable IT support in Sandton. Remote troubleshooting from R120, on-site callouts from R520. Serving Sandton's business & residential areas."
        canonicalUrl="/areas/sandton"
        structuredData={structuredData}
      />

      <div className="container px-4 py-12">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/areas" className="hover:text-primary">Service Areas</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Sandton</span>
        </nav>

        <div className="text-center space-y-3 mb-12">
          <Badge variant="outline" className="mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            Service Area
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">
            IT Support in Sandton
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional remote & on-site IT support for Sandton businesses and residents. Fast response times, transparent pricing, certified technician.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-primary" />
                Remote Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-2">R120</p>
              <p className="text-sm text-muted-foreground">
                Fast remote fixes - no travel time. Perfect for software issues, virus removal, and setup help.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                On-Site Callout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-2">R520</p>
              <p className="text-sm text-muted-foreground">
                R400 base + R120 transport (7km from Lombardy East). For hardware repairs and upgrades.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-2">30 min</p>
              <p className="text-sm text-muted-foreground">
                Remote: Within 30 minutes. On-site: Scheduled within 24 hours, same-day for urgent cases.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Choose Us for Sandton IT Support?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Business District Expertise</p>
                  <p className="text-sm text-muted-foreground">
                    We understand the unique IT needs of Sandton's business environment - fast response times and professional service.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Remote-First Approach</p>
                  <p className="text-sm text-muted-foreground">
                    Most issues fixed remotely for R120 - no need to leave your office or home. Secure, encrypted connections.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Transparent Pricing</p>
                  <p className="text-sm text-muted-foreground">
                    Clear fees upfront - R120 remote, R520 on-site. No hidden costs, no surprises.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">After-Hours Support Available</p>
                  <p className="text-sm text-muted-foreground">
                    Weekend and evening support for urgent issues. We know your work doesn't always fit 9-5 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">CompTIA Certified Technician</p>
                  <p className="text-sm text-muted-foreground">
                    9+ years experience with A+ and Network+ certifications. Professional, reliable service you can trust.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Services Available in Sandton</h2>
            <div className="grid gap-3">
              <Card className="bg-gradient-card border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Laptop className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Laptop & PC Repairs</p>
                      <p className="text-sm text-muted-foreground">Slow performance, won't boot, hardware failures</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Virus & Malware Removal</p>
                      <p className="text-sm text-muted-foreground">Complete cleanup, protection setup, security hardening</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Network & Wi-Fi Setup</p>
                      <p className="text-sm text-muted-foreground">Router config, connectivity issues, printer setup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">SSD Upgrades</p>
                      <p className="text-sm text-muted-foreground">Make your laptop 5x faster - from R900 for 500GB SSD</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Areas We Serve in Sandton</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Sandton City</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Nelson Mandela Square</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Sandton CBD</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Morningside</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Sandown</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Hyde Park</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Atholl</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Grayston</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Rivonia Road Area</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="q1">
              <AccordionTrigger>Do you provide IT support in Sandton?</AccordionTrigger>
              <AccordionContent>
                Yes! I provide both remote and on-site IT support throughout Sandton, including Sandton City, Nelson Mandela Square, and surrounding business areas. Remote support starts at R120, and on-site callouts are R520 (R400 base + R120 transport).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>How quickly can you respond to IT emergencies in Sandton?</AccordionTrigger>
              <AccordionContent>
                For remote support, I can typically connect within 30 minutes during business hours. On-site callouts in Sandton are scheduled within 24 hours, with same-day service available for urgent issues.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>What IT services do you offer in Sandton?</AccordionTrigger>
              <AccordionContent>
                I offer complete IT support including remote troubleshooting, virus removal, SSD upgrades, network setup, printer configuration, Windows installations, and emergency support for both home offices and small businesses in Sandton.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>Why does Sandton have a higher callout fee?</AccordionTrigger>
              <AccordionContent>
                The R520 callout fee includes R400 base service plus R120 for transport from my Lombardy East base (7km distance). Remote support is always R120 regardless of location - perfect for most software issues.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger>Can you help with business IT in Sandton?</AccordionTrigger>
              <AccordionContent>
                Absolutely! I support small businesses throughout Sandton with network setup, employee PC troubleshooting, printer/scanner configuration, and ongoing IT maintenance. My remote-first approach minimizes disruption to your workday.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6">
              <AccordionTrigger>Do you offer same-day service in Sandton?</AccordionTrigger>
              <AccordionContent>
                Yes! Remote support is typically available within 30 minutes. For on-site visits, same-day service is available for urgent cases (subject to schedule availability). Book early in the day for best same-day availability.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Your IT Issues Fixed?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Most issues fixed remotely within the hour. On-site support available for hardware repairs and upgrades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-primary">
              <Link to="/booking">
                <Clock className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/27670494876?text=Hi%2C%20I%20need%20IT%20support%20in%20Sandton" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:+27670494876">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>About Our Sandton IT Support Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Sandton is Johannesburg's premier business district, home to thousands of companies and professionals who rely on technology daily. Whether you're working from a high-rise office in Sandton City or managing a home office in one of Sandton's residential areas, computer problems can bring your day to a halt.
            </p>
            <p>
              Based in nearby Lombardy East (just 7km away), I provide fast, professional IT support to Sandton businesses and residents. My remote-first approach means most issues are resolved without you leaving your desk - perfect for busy professionals in Sandton's fast-paced business environment.
            </p>
            <h3 className="text-lg font-semibold mt-4">Why Remote Support Makes Sense for Sandton</h3>
            <p>
              Sandton traffic can be unpredictable, and your time is valuable. For most software issues - slow computers, virus removal, Windows updates, printer problems - remote support is faster and more cost-effective. I securely connect to your computer, you watch everything I do, and the issue is resolved while you stay productive.
            </p>
            <p>
              Only when hardware repairs or physical upgrades are needed (like SSD installations or RAM upgrades) do I schedule an on-site visit. This hybrid approach saves you time and money while ensuring you get the right solution for your specific problem.
            </p>
            <h3 className="text-lg font-semibold mt-4">Serving Sandton's Business Community</h3>
            <p>
              I understand that for Sandton businesses, downtime means lost revenue. That's why I prioritize fast response times and efficient solutions. Whether you're near Sandton Gautrain station, Sandton City mall, or anywhere in the greater Sandton area, I'm ready to help.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Service Areas:</strong> Sandton Central, Morningside, Sandown, Hyde Park, Atholl, Grayston, Rivonia Road area, and all surrounding suburbs within Sandton.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Sandton;
