import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Zap, Phone, MessageCircle, CheckCircle2, Shield, Laptop, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/data/seoStructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Midrand = () => {
  const midrandServiceSchema = serviceSchema({
    name: "IT Support Midrand",
    description: "Professional IT support in Midrand, Johannesburg. Remote troubleshooting from R120, on-site callouts from R550. Serving Midrand, Waterfall, and surrounding business parks with fast, reliable IT service.",
    price: "120",
    currency: "ZAR",
    provider: "BurbGigz IT Services",
    areaServed: ["Midrand", "Waterfall", "Johannesburg"]
  });

  const midrandFAQSchema = faqSchema([
    {
      question: "Do you provide IT support in Midrand?",
      answer: "Yes! I provide both remote and on-site IT support throughout Midrand and Waterfall areas. Remote support starts at R120, and on-site callouts are R550 (R400 base + R150 transport)."
    },
    {
      question: "How far is Midrand from your base?",
      answer: "Midrand is approximately 12km from my Lombardy East base. While this is slightly further, my remote support capabilities mean most issues are resolved without needing an on-site visit."
    },
    {
      question: "Can you help with business IT in Midrand business parks?",
      answer: "Absolutely! I support small businesses throughout Midrand's business parks and office complexes. From network setup to employee laptop support to server troubleshooting, I provide professional IT services."
    },
    {
      question: "Is remote support really effective for Midrand businesses?",
      answer: "Yes! Remote support is often faster and more cost-effective than on-site visits. I can fix software issues, resolve network problems, remove viruses, and provide tech support all remotely for R120. On-site visits are only needed for hardware repairs."
    }
  ]);

  const midrandBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/areas" },
    { name: "Midrand", url: "/areas/midrand" }
  ]);

  const structuredData = {
    "@graph": [midrandServiceSchema, midrandFAQSchema, midrandBreadcrumbs]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="IT Support Midrand | Fast Remote & On-Site Computer Repair"
        description="Professional IT support in Midrand & Waterfall, Johannesburg. Remote fixes from R120, on-site from R550. Same-day service for business parks & residential areas. Network setup, virus removal, laptop repairs, SSD upgrades."
        keywords="IT support Midrand, computer repair Midrand, laptop repair Midrand, remote IT support Midrand, business IT Midrand, virus removal Midrand, SSD upgrade Midrand, network setup Midrand, IT support Waterfall, printer setup Midrand, urgent IT help Midrand"
        ogTitle="IT Support Midrand | Remote & On-Site Computer Repair from R120"
        ogDescription="Fast, affordable IT support in Midrand & Waterfall. Remote troubleshooting from R120, on-site callouts from R550. Business & residential specialists."
        canonicalUrl="/areas/midrand"
        structuredData={structuredData}
      />

      <div className="container px-4 py-12">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/areas" className="hover:text-primary">Service Areas</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Midrand</span>
        </nav>

        <div className="text-center space-y-3 mb-12">
          <Badge variant="outline" className="mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            Service Area
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">
            IT Support in Midrand
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional remote & on-site IT support for Midrand and Waterfall businesses and homes. Remote-first for efficiency, on-site when needed.
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
                Fast remote fixes - no travel time. Perfect for software issues, virus removal, and troubleshooting.
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
              <p className="text-3xl font-bold text-primary mb-2">R550</p>
              <p className="text-sm text-muted-foreground">
                R400 base + R150 transport (12km from Lombardy East). For hardware repairs and physical setups.
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
                Remote: Within 30 minutes. On-site: Scheduled within 24-48 hours, same-day for urgent cases.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Choose Us for Midrand IT Support?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Remote-First = Cost-Effective</p>
                  <p className="text-sm text-muted-foreground">
                    Most issues fixed remotely for R120 - no need to pay for distance travel. Fast, affordable, efficient.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Business Park Experience</p>
                  <p className="text-sm text-muted-foreground">
                    We support businesses in Midrand's office parks and commercial areas. Professional, reliable IT support.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Transparent Pricing</p>
                  <p className="text-sm text-muted-foreground">
                    Clear fees: R120 remote, R550 on-site. No hidden costs, no surprises. Budget-friendly for small businesses.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Same-Day Remote Support</p>
                  <p className="text-sm text-muted-foreground">
                    Most remote issues resolved within the hour. On-site visits scheduled for urgent hardware needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Certified Technician</p>
                  <p className="text-sm text-muted-foreground">
                    CompTIA A+ and Network+ certified with 9+ years experience. Professional, expert service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Services Available in Midrand</h2>
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
                      <p className="text-sm text-muted-foreground">Office networks, connectivity issues, router config</p>
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
                      <p className="text-sm text-muted-foreground">Make business laptops 5x faster - from R900 for 500GB SSD</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Areas We Serve in Midrand</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Midrand Central</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Waterfall</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Grand Central</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Carlswald</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Vorna Valley</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Business Parks</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="q1">
              <AccordionTrigger>Do you provide IT support in Midrand?</AccordionTrigger>
              <AccordionContent>
                Yes! We provide both remote and on-site IT support throughout Midrand and Waterfall areas. Remote support starts at R120, and on-site callouts are R550 (R400 base + R150 transport).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>How far is Midrand from your base?</AccordionTrigger>
              <AccordionContent>
                Midrand is approximately 12km from our Lombardy East base. While this is slightly further, our remote support capabilities mean most issues are resolved without needing an on-site visit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>Can you help with business IT in Midrand business parks?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We support small businesses throughout Midrand's business parks and office complexes. From network setup to employee laptop support to server troubleshooting, we provide professional IT services.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>Is remote support really effective for Midrand businesses?</AccordionTrigger>
              <AccordionContent>
                Yes! Remote support is often faster and more cost-effective than on-site visits. We can fix software issues, resolve network problems, remove viruses, and provide tech support all remotely for R120. On-site visits are only needed for hardware repairs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger>Do you support the Waterfall area?</AccordionTrigger>
              <AccordionContent>
                Yes! Waterfall is part of our Midrand service area. Whether you're in a residential estate or office building in Waterfall, we provide the same professional remote and on-site IT support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6">
              <AccordionTrigger>Can you schedule on-site visits in Midrand on weekends?</AccordionTrigger>
              <AccordionContent>
                Yes, weekend on-site visits can be arranged for urgent issues. Remote support is available most weekends. Contact us to schedule based on your specific needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Your IT Issues Fixed?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Most issues fixed remotely within the hour for just R120. On-site support available when hardware repairs are needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-primary">
              <Link to="/booking">
                <Clock className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/27670494876?text=Hi%2C%20I%20need%20IT%20support%20in%20Midrand" target="_blank" rel="noopener noreferrer">
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
            <CardTitle>About Our Midrand IT Support Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Midrand sits strategically between Johannesburg and Pretoria, making it a hub for businesses, logistics, and growing residential estates like Waterfall. The area's mix of corporate offices, SMEs, and tech-savvy residents creates diverse IT support needs.
            </p>
            <p>
              While Midrand is 12km from our Lombardy East base, our remote-first approach means distance isn't a barrier to fast, effective IT support. For R120, we can remotely fix most software issues, troubleshoot network problems, remove viruses, and provide tech support - all without you waiting for a technician to arrive through Midrand traffic.
            </p>
            <h3 className="text-lg font-semibold mt-4">Supporting Midrand's Business Community</h3>
            <p>
              Midrand's business parks house countless SMEs and startups that need reliable, affordable IT support. Our service model is perfect for small businesses: remote support for day-to-day issues (R120), scheduled on-site visits for hardware needs (R550). No expensive monthly retainers, no long-term contracts - just pay-as-you-go professional IT support.
            </p>
            <h3 className="text-lg font-semibold mt-4">Waterfall Residential IT Support</h3>
            <p>
              Waterfall's modern residential estates have created a community of professionals working from home who need reliable home office IT support. We specialize in home office setups: optimizing Wi-Fi for large homes, configuring dual monitors, troubleshooting VPN connections, setting up networked printers. Remote support means we can help immediately, without scheduling conflicts or waiting.
            </p>
            <h3 className="text-lg font-semibold mt-4">When On-Site Visits Make Sense</h3>
            <p>
              For hardware installations (SSD upgrades, RAM additions), physical network setups, or issues that require hands-on diagnosis, we schedule on-site visits. The R550 fee includes travel and initial diagnostics, with all additional work quoted upfront. For Midrand businesses and residents, this hybrid remote/on-site approach provides the best value and fastest resolution.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Service Areas:</strong> Midrand Central, Waterfall (residential and commercial), Grand Central, Carlswald, Vorna Valley, and surrounding business parks and industrial areas.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Midrand;
