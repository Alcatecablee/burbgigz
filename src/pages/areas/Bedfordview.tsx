import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Zap, Phone, MessageCircle, CheckCircle2, Shield, Laptop, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/data/seoStructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Bedfordview = () => {
  const bedfordviewServiceSchema = serviceSchema({
    name: "IT Support Bedfordview",
    description: "Professional IT support in Bedfordview, Johannesburg. Remote troubleshooting from R120, on-site callouts from R500. Serving Bedfordview, Kensington, and surrounding residential areas.",
    price: "120",
    currency: "ZAR",
    provider: "BurbGigz IT Services",
    areaServed: ["Bedfordview", "Kensington", "Johannesburg"]
  });

  const bedfordviewFAQSchema = faqSchema([
    {
      question: "Do you provide IT support in Bedfordview?",
      answer: "Yes! I provide both remote and on-site IT support throughout Bedfordview and Kensington. Remote support starts at R120, and on-site callouts are R500 (R400 base + R100 transport from Lombardy East)."
    },
    {
      question: "How quickly can you get to Bedfordview for on-site support?",
      answer: "Bedfordview is just 5km from my Lombardy East base. I typically schedule on-site visits within 24 hours, with same-day service available for urgent cases."
    },
    {
      question: "Do you support home offices in Bedfordview?",
      answer: "Absolutely! Many Bedfordview residents work from home, and I specialize in home office IT support - from Wi-Fi troubleshooting to printer setup to laptop upgrades. Remote support is perfect for most issues."
    },
    {
      question: "What's included in the R500 on-site fee for Bedfordview?",
      answer: "The R500 covers the callout (R400 base + R100 transport) plus initial diagnostics. Additional repairs like SSD installation or virus removal may have extra fees, but I'll quote everything upfront."
    }
  ]);

  const bedfordviewBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/areas" },
    { name: "Bedfordview", url: "/areas/bedfordview" }
  ]);

  const structuredData = {
    "@graph": [bedfordviewServiceSchema, bedfordviewFAQSchema, bedfordviewBreadcrumbs]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="IT Support Bedfordview | Fast Remote & On-Site Computer Repair"
        description="Professional IT support in Bedfordview, Johannesburg. Remote fixes from R120, on-site from R500. Same-day service for Bedfordview & Kensington. Home office specialists. SSD upgrades, virus removal, Wi-Fi setup."
        keywords="IT support Bedfordview, computer repair Bedfordview, laptop repair Bedfordview, remote IT support Bedfordview, on-site IT Bedfordview, virus removal Bedfordview, SSD upgrade Bedfordview, home office IT Bedfordview, printer setup Bedfordview, urgent IT help Bedfordview, same day IT support Bedfordview"
        ogTitle="IT Support Bedfordview | Remote & On-Site Computer Repair from R120"
        ogDescription="Fast, affordable IT support in Bedfordview. Remote troubleshooting from R120, on-site callouts from R500. Home office specialists."
        canonicalUrl="/areas/bedfordview"
        structuredData={structuredData}
      />

      <div className="container px-4 py-12">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/areas" className="hover:text-primary">Service Areas</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Bedfordview</span>
        </nav>

        <div className="text-center space-y-3 mb-12">
          <Badge variant="outline" className="mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            Service Area
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">
            IT Support in Bedfordview
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional remote & on-site IT support for Bedfordview homes and small businesses. Fast response times, home office specialists.
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
              <p className="text-3xl font-bold text-primary mb-2">R500</p>
              <p className="text-sm text-muted-foreground">
                R400 base + R100 transport (5km from Lombardy East). For hardware repairs and upgrades.
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
            <h2 className="text-2xl font-bold mb-4">Why Choose Us for Bedfordview IT Support?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Close to You - Fast Response</p>
                  <p className="text-sm text-muted-foreground">
                    Just 5km from our Lombardy East base means quick on-site visits when hardware repairs are needed.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Home Office Specialists</p>
                  <p className="text-sm text-muted-foreground">
                    We understand work-from-home setups. Wi-Fi coverage, printer sharing, video call issues - we've seen it all.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Affordable, Transparent Pricing</p>
                  <p className="text-sm text-muted-foreground">
                    Clear fees upfront - R120 remote, R500 on-site. No hidden costs, no call-out surprises.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Same-Day Service Available</p>
                  <p className="text-sm text-muted-foreground">
                    Urgent issue? We prioritize same-day remote support and can often schedule on-site visits same-day too.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Certified & Experienced</p>
                  <p className="text-sm text-muted-foreground">
                    CompTIA A+ and Network+ certified with 9+ years helping Johannesburg residents.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Services Available in Bedfordview</h2>
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
                      <p className="text-sm text-muted-foreground">Router config, coverage issues, printer setup</p>
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
          <h2 className="text-2xl font-bold mb-4">Areas We Serve Around Bedfordview</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Bedfordview Central</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Kensington</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Bedfordview Gardens</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Bedford Centre Area</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Van Riebeeck Park</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Dowerglen</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="q1">
              <AccordionTrigger>Do you provide IT support in Bedfordview?</AccordionTrigger>
              <AccordionContent>
                Yes! We provide both remote and on-site IT support throughout Bedfordview and Kensington. Remote support starts at R120, and on-site callouts are R500 (R400 base + R100 transport from Lombardy East).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>How quickly can you get to Bedfordview for on-site support?</AccordionTrigger>
              <AccordionContent>
                Bedfordview is just 5km from our Lombardy East base. We typically schedule on-site visits within 24 hours, with same-day service available for urgent cases.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>Do you support home offices in Bedfordview?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Many Bedfordview residents work from home, and we specialize in home office IT support - from Wi-Fi troubleshooting to printer setup to laptop upgrades. Remote support is perfect for most issues.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>What's included in the R500 on-site fee for Bedfordview?</AccordionTrigger>
              <AccordionContent>
                The R500 covers the callout (R400 base + R100 transport) plus initial diagnostics. Additional repairs like SSD installation or virus removal may have extra fees, but we'll quote everything upfront.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger>Can I book weekend IT support in Bedfordview?</AccordionTrigger>
              <AccordionContent>
                Yes! Weekend support is available for urgent issues. Remote support is typically available Saturday and Sunday, and we can schedule on-site visits for hardware repairs that can't wait until Monday.
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
              <a href="https://wa.me/27670494876?text=Hi%2C%20I%20need%20IT%20support%20in%20Bedfordview" target="_blank" rel="noopener noreferrer">
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
            <CardTitle>About Our Bedfordview IT Support Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Bedfordview is a vibrant residential and commercial suburb in the East Rand, known for its tree-lined streets and strong community feel. With many professionals working from home and small businesses operating in the area, reliable IT support is essential.
            </p>
            <p>
              Based just 5km away in Lombardy East, we're your local IT support provider for Bedfordview. Our proximity means fast response times for on-site visits, while our remote support capabilities mean most issues are resolved without you waiting for a technician to arrive.
            </p>
            <h3 className="text-lg font-semibold mt-4">Home Office IT Support</h3>
            <p>
              Working from home in Bedfordview? We specialize in home office setups. Whether you need help with Wi-Fi coverage across your house, printer sharing between family members, or optimizing your laptop for video calls, we've got you covered. Our remote support means we can help you troubleshoot without disrupting your work day.
            </p>
            <h3 className="text-lg font-semibold mt-4">Why Remote Support Works</h3>
            <p>
              For most IT issues - slow computers, virus removal, Windows problems, software installation - remote support is faster and more affordable than waiting for an on-site visit. We connect securely to your computer, you watch everything we do in real-time, and the problem is fixed while you stay comfortable at home.
            </p>
            <p>
              Only when physical repairs are needed (like hardware upgrades or component replacements) do we schedule an on-site visit. This hybrid approach saves you time and money while ensuring the best solution for your specific problem.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Service Areas:</strong> Bedfordview Central, Kensington, Bedfordview Gardens, Bedford Centre area, Van Riebeeck Park, Dowerglen, and all surrounding neighborhoods.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Bedfordview;
