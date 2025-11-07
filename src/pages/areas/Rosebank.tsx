import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Zap, Phone, MessageCircle, CheckCircle2, Shield, Laptop, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/data/seoStructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Rosebank = () => {
  const rosebankServiceSchema = serviceSchema({
    name: "IT Support Rosebank",
    description: "Professional IT support in Rosebank, Johannesburg. Remote troubleshooting from R120, on-site callouts from R520. Serving Rosebank Mall, Gautrain station area, and surrounding business districts.",
    price: "120",
    currency: "ZAR",
    provider: "BurbGigz IT Services",
    areaServed: ["Rosebank", "Rosebank Mall", "Johannesburg"]
  });

  const rosebankFAQSchema = faqSchema([
    {
      question: "Do you provide IT support in Rosebank?",
      answer: "Yes! I provide both remote and on-site IT support throughout Rosebank, including the Gautrain station area, Rosebank Mall, and surrounding business districts. Remote support starts at R120, and on-site callouts are R520."
    },
    {
      question: "Can you help with business IT in Rosebank?",
      answer: "Absolutely! I support small businesses and home offices throughout Rosebank. From network setup to employee laptop troubleshooting to printer configuration, I provide professional IT support tailored to your business needs."
    },
    {
      question: "How quickly can you respond in Rosebank?",
      answer: "Remote support is typically available within 30 minutes. On-site visits are scheduled within 24 hours, with same-day service available for urgent business IT issues."
    },
    {
      question: "Why does Rosebank have a R520 callout fee?",
      answer: "The R520 includes R400 base service plus R120 transport from my Lombardy East base. However, most issues can be fixed remotely for just R120 - perfect for software problems and troubleshooting."
    }
  ]);

  const rosebankBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/areas" },
    { name: "Rosebank", url: "/areas/rosebank" }
  ]);

  const structuredData = {
    "@graph": [rosebankServiceSchema, rosebankFAQSchema, rosebankBreadcrumbs]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="IT Support Rosebank | Fast Remote & On-Site Computer Repair"
        description="Professional IT support in Rosebank, Johannesburg. Remote fixes from R120, on-site from R520. Same-day service for Rosebank Mall, Gautrain area & business district. Small business IT specialists. Network setup, virus removal, laptop repairs."
        keywords="IT support Rosebank, computer repair Rosebank, laptop repair Rosebank, remote IT support Rosebank, business IT Rosebank, virus removal Rosebank, SSD upgrade Rosebank, network setup Rosebank, printer setup Rosebank, Rosebank Mall IT support, urgent IT help Rosebank"
        ogTitle="IT Support Rosebank | Remote & On-Site Computer Repair from R120"
        ogDescription="Fast, affordable IT support in Rosebank. Remote troubleshooting from R120, on-site callouts from R520. Business & home office specialists."
        canonicalUrl="/areas/rosebank"
        structuredData={structuredData}
      />

      <div className="container px-4 py-12">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/areas" className="hover:text-primary">Service Areas</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Rosebank</span>
        </nav>

        <div className="text-center space-y-3 mb-12">
          <Badge variant="outline" className="mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            Service Area
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">
            IT Support in Rosebank
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional remote & on-site IT support for Rosebank businesses and residents. Fast response, business-grade service, affordable rates.
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
                R400 base + R120 transport. For hardware repairs and business on-site needs.
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
            <h2 className="text-2xl font-bold mb-4">Why Choose Us for Rosebank IT Support?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Business District Experience</p>
                  <p className="text-sm text-muted-foreground">
                    We understand the fast-paced needs of Rosebank's business environment. Minimal downtime, professional service.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Remote-First Efficiency</p>
                  <p className="text-sm text-muted-foreground">
                    Most issues fixed remotely for R120 - no disruption to your office. Secure, encrypted connections.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Clear, Upfront Pricing</p>
                  <p className="text-sm text-muted-foreground">
                    R120 remote, R520 on-site. No hidden fees, no surprises. Budget-friendly for small businesses.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">After-Hours & Weekend Support</p>
                  <p className="text-sm text-muted-foreground">
                    Available for urgent issues outside business hours. We know your work doesn't stop at 5pm.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">CompTIA Certified Professional</p>
                  <p className="text-sm text-muted-foreground">
                    9+ years experience with A+ and Network+ certifications. Reliable, expert service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Services Available in Rosebank</h2>
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
                      <p className="text-sm text-muted-foreground">Office network config, connectivity troubleshooting</p>
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
                      <p className="text-sm text-muted-foreground">Make work laptops 5x faster - from R900 for 500GB SSD</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Areas We Serve in Rosebank</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Rosebank Mall</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Rosebank Gautrain Station</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>The Zone @ Rosebank</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Cradock Avenue</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Jan Smuts Avenue</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Oxford Road Area</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="q1">
              <AccordionTrigger>Do you provide IT support in Rosebank?</AccordionTrigger>
              <AccordionContent>
                Yes! We provide both remote and on-site IT support throughout Rosebank, including the Gautrain station area, Rosebank Mall, and surrounding business districts. Remote support starts at R120, and on-site callouts are R520.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>Can you help with business IT in Rosebank?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We support small businesses and home offices throughout Rosebank. From network setup to employee laptop troubleshooting to printer configuration, we provide professional IT support tailored to your business needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>How quickly can you respond in Rosebank?</AccordionTrigger>
              <AccordionContent>
                Remote support is typically available within 30 minutes. On-site visits are scheduled within 24 hours, with same-day service available for urgent business IT issues.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>Why does Rosebank have a R520 callout fee?</AccordionTrigger>
              <AccordionContent>
                The R520 includes R400 base service plus R120 transport from our Lombardy East base. However, most issues can be fixed remotely for just R120 - perfect for software problems and troubleshooting.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger>Do you work with offices near Rosebank Gautrain?</AccordionTrigger>
              <AccordionContent>
                Yes! We frequently work with offices around the Gautrain station area. Whether you're in a high-rise office building or a small business suite, we provide the same professional IT support. Remote access is often most convenient for busy office environments.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6">
              <AccordionTrigger>Can you help with networking multiple computers in an office?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We can set up small office networks, configure shared printers, set up file sharing, and troubleshoot connectivity issues. This often starts with a remote consultation to assess your needs, followed by an on-site visit if physical network setup is required.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Your IT Issues Fixed?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Most issues fixed remotely within the hour. On-site support available for hardware repairs and business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-primary">
              <Link to="/booking">
                <Clock className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/27670494876?text=Hi%2C%20I%20need%20IT%20support%20in%20Rosebank" target="_blank" rel="noopener noreferrer">
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
            <CardTitle>About Our Rosebank IT Support Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Rosebank is one of Johannesburg's most dynamic business and lifestyle hubs, home to corporate offices, creative agencies, retail spaces, and residential apartments. The area's concentration of professionals and businesses creates a constant demand for reliable IT support.
            </p>
            <p>
              From our nearby Lombardy East base, we provide comprehensive IT support to Rosebank's business community and residents. Whether you're in an office near the Gautrain station, working from a home office in one of Rosebank's residential buildings, or managing a small business near Rosebank Mall, we're equipped to help.
            </p>
            <h3 className="text-lg font-semibold mt-4">Business-Grade Service at Affordable Rates</h3>
            <p>
              Rosebank businesses need IT support that's professional, reliable, and doesn't break the bank. Our remote-first approach means we can troubleshoot employee laptops, fix server connectivity issues, and resolve software problems without the cost and delay of an on-site visit. For R120, most issues are resolved within the hour.
            </p>
            <p>
              When on-site work is needed - network installations, hardware upgrades, or physical troubleshooting - we schedule visits that minimize disruption to your business operations. Our R520 on-site fee is transparent and includes initial diagnostics.
            </p>
            <h3 className="text-lg font-semibold mt-4">Supporting Rosebank's Work-From-Home Community</h3>
            <p>
              Many Rosebank residents now work remotely, and a reliable home office setup is essential. We specialize in home office IT: optimizing Wi-Fi coverage for video calls, setting up dual monitors, configuring VPN access, troubleshooting printer connectivity - all the small issues that can derail a workday.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Service Areas:</strong> Rosebank Mall area, Gautrain Station precinct, The Zone @ Rosebank, Cradock Avenue, Jan Smuts Avenue, Oxford Road, and all surrounding business and residential areas.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Rosebank;
