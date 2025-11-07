import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Zap, Phone, MessageCircle, CheckCircle2, Shield, Laptop, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/data/seoStructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Edenvale = () => {
  const edenvaleServiceSchema = serviceSchema({
    name: "IT Support Edenvale",
    description: "Professional IT support in Edenvale, Johannesburg. Remote troubleshooting from R120, on-site callouts from R490. Serving Edenvale, Greenstone, and surrounding areas with fast, affordable service.",
    price: "120",
    currency: "ZAR",
    provider: "BurbGigz IT Services",
    areaServed: ["Edenvale", "Greenstone", "Johannesburg"]
  });

  const edenvaleFAQSchema = faqSchema([
    {
      question: "Do you provide IT support in Edenvale?",
      answer: "Yes! I provide both remote and on-site IT support throughout Edenvale and the surrounding areas. Remote support starts at R120, and on-site callouts are R490 (R400 base + R90 transport from Lombardy East)."
    },
    {
      question: "How far are you from Edenvale?",
      answer: "I'm based in Lombardy East, approximately 5km from Edenvale. This means quick response times for on-site visits and excellent coverage of the entire Edenvale area."
    },
    {
      question: "Can you help with home and business IT in Edenvale?",
      answer: "Absolutely! I support both residential and small business IT needs in Edenvale - from home office setups to small retail shops. My services include remote troubleshooting, virus removal, network setup, and hardware upgrades."
    },
    {
      question: "Do you service the Greenstone area?",
      answer: "Yes! I cover Greenstone Shopping Centre and surrounding areas. The callout fee is the same as Edenvale (R490) since they're in the same general area from my base."
    }
  ]);

  const edenvaleBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/areas" },
    { name: "Edenvale", url: "/areas/edenvale" }
  ]);

  const structuredData = {
    "@graph": [edenvaleServiceSchema, edenvaleFAQSchema, edenvaleBreadcrumbs]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="IT Support Edenvale | Fast Remote & On-Site Computer Repair"
        description="Professional IT support in Edenvale, Johannesburg. Remote fixes from R120, on-site from R490. Same-day service for Edenvale & Greenstone. Laptop repairs, virus removal, Wi-Fi setup, SSD upgrades. Home & business support."
        keywords="IT support Edenvale, computer repair Edenvale, laptop repair Edenvale, remote IT support Edenvale, on-site IT Edenvale, virus removal Edenvale, SSD upgrade Edenvale, network setup Edenvale, printer setup Edenvale, IT support Greenstone, urgent IT help Edenvale, same day IT support Edenvale"
        ogTitle="IT Support Edenvale | Remote & On-Site Computer Repair from R120"
        ogDescription="Fast, affordable IT support in Edenvale. Remote troubleshooting from R120, on-site callouts from R490. Home & business specialists."
        canonicalUrl="/areas/edenvale"
        structuredData={structuredData}
      />

      <div className="container px-4 py-12">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/areas" className="hover:text-primary">Service Areas</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Edenvale</span>
        </nav>

        <div className="text-center space-y-3 mb-12">
          <Badge variant="outline" className="mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            Service Area
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">
            IT Support in Edenvale
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional remote & on-site IT support for Edenvale homes and businesses. Quick response, affordable pricing, local service.
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
              <p className="text-3xl font-bold text-primary mb-2">R490</p>
              <p className="text-sm text-muted-foreground">
                R400 base + R90 transport (5km from Lombardy East). For hardware repairs and upgrades.
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
                Remote: Within 30 minutes. On-site: Next-day or same-day for urgent cases.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Choose Us for Edenvale IT Support?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Local & Close By</p>
                  <p className="text-sm text-muted-foreground">
                    Just 5km from our Lombardy East base means we're truly local to Edenvale. Fast on-site response when needed.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Affordable Rates</p>
                  <p className="text-sm text-muted-foreground">
                    Remote support from R120, on-site from R490. Transparent pricing with no hidden fees or surprises.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Home & Business Support</p>
                  <p className="text-sm text-muted-foreground">
                    Whether you're working from home or running a small shop, we understand your IT needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Same-Day Service Available</p>
                  <p className="text-sm text-muted-foreground">
                    Remote support typically within 30 minutes. On-site visits scheduled same-day for urgent issues.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Certified Professional</p>
                  <p className="text-sm text-muted-foreground">
                    CompTIA A+ and Network+ certified with 9+ years serving Johannesburg's East Rand.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Services Available in Edenvale</h2>
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
                      <p className="text-sm text-muted-foreground">Router config, coverage issues, printer network setup</p>
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
          <h2 className="text-2xl font-bold mb-4">Areas We Serve in Edenvale</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Edenvale Central</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Greenstone Shopping Centre</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Dowerglen</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Northmead</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Eastleigh</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Dunvegan</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="q1">
              <AccordionTrigger>Do you provide IT support in Edenvale?</AccordionTrigger>
              <AccordionContent>
                Yes! We provide both remote and on-site IT support throughout Edenvale and the surrounding areas. Remote support starts at R120, and on-site callouts are R490 (R400 base + R90 transport from Lombardy East).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>How far are you from Edenvale?</AccordionTrigger>
              <AccordionContent>
                We're based in Lombardy East, approximately 5km from Edenvale. This means quick response times for on-site visits and excellent coverage of the entire Edenvale area.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>Can you help with home and business IT in Edenvale?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We support both residential and small business IT needs in Edenvale - from home office setups to small retail shops. Our services include remote troubleshooting, virus removal, network setup, and hardware upgrades.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>Do you service the Greenstone area?</AccordionTrigger>
              <AccordionContent>
                Yes! We cover Greenstone Shopping Centre and surrounding areas. The callout fee is the same as Edenvale (R490) since they're in the same general area from our base.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger>What if I'm not sure whether I need remote or on-site support?</AccordionTrigger>
              <AccordionContent>
                No problem! Contact us and describe your issue. We'll advise whether remote support can fix it (most software issues) or if an on-site visit is needed (hardware repairs). We always recommend remote first as it's faster and more affordable.
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
              <a href="https://wa.me/27670494876?text=Hi%2C%20I%20need%20IT%20support%20in%20Edenvale" target="_blank" rel="noopener noreferrer">
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
            <CardTitle>About Our Edenvale IT Support Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Edenvale is a thriving suburb in Johannesburg's East Rand, home to families, professionals, and small businesses. From the bustling Greenstone Shopping Centre to quiet residential streets, Edenvale residents rely on technology for work, school, and entertainment.
            </p>
            <p>
              Based in neighboring Lombardy East (just 5km away), we're your local IT support provider for all of Edenvale. Our proximity means quick response times for on-site visits, while our remote support capabilities ensure most issues are resolved without waiting for a technician to arrive.
            </p>
            <h3 className="text-lg font-semibold mt-4">Serving Edenvale's Diverse IT Needs</h3>
            <p>
              Whether you're a parent helping kids with online schooling, a professional working from home, or a small business owner managing a shop near Greenstone, we understand your IT challenges. Slow computers, printer problems, Wi-Fi coverage issues - we've seen it all and know how to fix it efficiently.
            </p>
            <h3 className="text-lg font-semibold mt-4">Remote-First, On-Site When Needed</h3>
            <p>
              Our approach is simple: fix it remotely when possible (faster and cheaper), schedule an on-site visit when necessary (hardware repairs, upgrades). For most software issues - virus removal, slow performance, Windows problems - remote support gets you back up and running within the hour.
            </p>
            <p>
              When physical repairs are needed, we're close enough to schedule same-day visits for urgent cases. Our R490 on-site fee includes diagnostics and initial troubleshooting, with all additional work quoted upfront before we proceed.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Service Areas:</strong> Edenvale Central, Greenstone Shopping Centre area, Dowerglen, Northmead, Eastleigh, Dunvegan, and all surrounding neighborhoods.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Edenvale;
