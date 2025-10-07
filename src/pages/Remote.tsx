import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Copy, Phone, MessageCircle, Shield, BookOpen, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/data/seoStructuredData";

import { Link } from "react-router-dom";
import { posts } from "@/data/blog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const RUSTDESK_SITE = "https://rustdesk.com/";
const RUSTDESK_RELEASES = "https://github.com/rustdesk/rustdesk/releases";

const validateRustDeskId = (id: string) => /^[0-9]{9,10}$/.test(id.replace(/\s/g, ""));
const validatePassword = (pwd: string) => /^[a-zA-Z0-9]{6}$/.test(pwd);

const Remote = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [idError, setIdError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const { toast } = useToast();

  // SEO structured data for remote support service
  const remoteServiceSchema = serviceSchema({
    name: "Remote IT Support Johannesburg",
    description: "Professional remote IT support in Johannesburg via secure remote tools. Fast response, affordable pricing from R120. Serving businesses and homes in Johannesburg and surrounding areas.",
    price: "120",
    currency: "ZAR",
    provider: "BurbGigz IT Services",
    areaServed: ["Johannesburg", "Lombardy East", "Bedfordview", "Edenvale", "Alexandra", "Sandton", "Greenstone", "Kempton Park"]
  });

  const remoteFAQSchema = faqSchema([
    {
      question: "How does remote support work?",
      answer: "We use secure remote tools like RustDesk to connect to your computer with your permission. You can see everything we do and end the session at any time."
    },
    {
      question: "Is remote support secure?",
      answer: "Yes, we use encrypted connections and require your explicit permission. You remain in full control of your computer throughout the session."
    },
    {
      question: "What can be fixed remotely?",
      answer: "Most software issues including slow performance, virus removal, Windows errors, Wi-Fi setup, software installation, and system optimization."
    },
    {
      question: "How much does remote support cost?",
      answer: "Remote support sessions start from R120, which is much more affordable than on-site callouts starting at R400."
    }
  ]);

  const remoteBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Remote Support", url: "/remote" }
  ]);

  const structuredData = {
    "@graph": [remoteServiceSchema, remoteFAQSchema, remoteBreadcrumbs]
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setIdError(validateRustDeskId(value) ? "" : "ID must be 9–10 digits");
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);
    setPwdError(validatePassword(value) ? "" : "Password must be 6 alphanumeric characters");
  };

  const whatsappHref = useMemo(() => {
    const base = "https://wa.me/27670494876";
    const text = `Remote Support Request (RustDesk)\nID: ${id || "<enter ID>"}\nPassword: ${pwd || "<enter password>"}\nLocation: Lombardy East`;
    return `${base}?text=${encodeURIComponent(text)}`;
  }, [id, pwd]);

  const copyDetails = async () => {
    if (!validateRustDeskId(id) || !validatePassword(pwd)) {
      toast({
        title: "Error",
        description: "Please enter a valid RustDesk ID and password.",
        variant: "destructive"
      });
      return;
    }
    const text = `RustDesk ID: ${id}\nPassword: ${pwd}`;
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Success",
        description: "RustDesk details copied to clipboard!"
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy details.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Remote IT Support Johannesburg | Fast, Secure & Affordable - BurbGigz"
        description="Professional Remote IT Support in Johannesburg from R120. Fast response, secure connections. Fix Windows errors, slow PCs, WiFi issues & more. Serving Lombardy East, Edenvale, Bedfordview & surrounding areas."
        keywords="remote IT support Johannesburg, remote computer support, remote tech support Johannesburg, IT support Lombardy East, remote desktop support, remote PC help Johannesburg, remote computer repair Johannesburg, IT technician Johannesburg"
        ogTitle="Remote IT Support Johannesburg | Professional & Secure"
        ogDescription="Expert Remote IT Support in Johannesburg. Quick response, encrypted connections, transparent pricing from R120. Boost your business productivity today."
        canonicalUrl="/remote"
        structuredData={structuredData}
      />
      <div className="container px-4 py-12 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4"><Link to="/" className="hover:text-primary">Home</Link><span className="mx-2">/</span><span className="text-foreground">Remote Support</span></nav>
        <div className="space-y-3 mb-8 text-center">
          <Badge variant="outline">Remote IT Support</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Remote IT Support Johannesburg</h1>
          <p className="text-muted-foreground text-lg">Professional, Fast & Secure Remote IT Support for Johannesburg Businesses & Homes</p>
          <p className="text-sm text-muted-foreground">Serving Lombardy East, Edenvale, Bedfordview, Sandton & surrounding areas</p>
        </div>

        {/* Business Benefits Section */}
        <section className="mb-10 bg-gradient-to-r from-primary/5 to-success/5 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Our Remote IT Support in Johannesburg?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-primary mb-2">⚡ Fast Response Time</h3>
              <p className="text-muted-foreground">Get help within minutes, not hours. Most remote IT support issues in Johannesburg are resolved in under 30 minutes, minimizing your downtime and keeping your business productive.</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">💰 Cost-Effective Solution</h3>
              <p className="text-muted-foreground">Save money with remote IT support from just R120 per session - no travel costs, no waiting for technicians. Much more affordable than traditional on-site callouts (R400+).</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">🛡️ Secure & Professional</h3>
              <p className="text-muted-foreground">9+ years of IT experience with CompTIA A+ and Network+ certifications. Encrypted connections, transparent service, and you stay in full control throughout the session.</p>
            </div>
          </div>
        </section>

        {/* What We Fix Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Remote IT Support Services in Johannesburg</h2>
          <p className="text-muted-foreground mb-4">Our remote IT support technicians can quickly diagnose and fix a wide range of computer and network issues:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-lg">Software & System Issues</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>✓ Slow computer performance & optimization</li>
                  <li>✓ Windows errors, crashes & blue screens</li>
                  <li>✓ Software installation & updates</li>
                  <li>✓ Virus & malware removal</li>
                  <li>✓ System tune-ups & cleanup</li>
                  <li>✓ Data backup configuration</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-lg">Network & Connectivity</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>✓ WiFi & internet connection problems</li>
                  <li>✓ Email configuration (Outlook, Gmail, etc.)</li>
                  <li>✓ Printer setup & troubleshooting</li>
                  <li>✓ VPN setup for remote work</li>
                  <li>✓ Network troubleshooting</li>
                  <li>✓ Cloud services configuration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10 text-sm text-muted-foreground space-y-3">
          <h2 className="text-2xl font-semibold text-foreground mb-3">How Remote IT Support Works</h2>
          <p>
            Remote IT support allows me to securely connect to your computer in Johannesburg and fix most software issues without a physical visit. Using secure, encrypted remote desktop tools like RustDesk, I can diagnose problems, install updates, remove viruses, configure settings, and optimize performance - all while you watch on your screen.
          </p>
          <p>
            This approach is perfect for busy professionals and small businesses in Johannesburg who need fast IT support without disrupting their workflow. For hardware issues like SSD upgrades or physical repairs, I provide professional on-site IT support throughout Lombardy East, Edenvale, Bedfordview, and nearby Johannesburg suburbs.
          </p>
        </section>

        {/* Security & Trust Banner */}
        <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-success mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Safe, Secure, Consent-Based Remote Access</h2>
              <p className="text-sm text-muted-foreground">
                <strong>Unlike tech support scams,</strong> we NEVER cold-call, send pop-ups, or demand immediate access. 
                RustDesk is a secure, open-source tool that requires YOUR permission. You see everything we do, and you 
                can end the session instantly at any time. No permanent access, no hidden software, no pressure tactics.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">
                  ✓ Encrypted Connection
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ✓ You Control Access
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ✓ Open Source Tool
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ✓ No Permanent Access
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Concerned about tech support scams?{" "}
                <Link to="/scam-awareness" className="text-primary hover:underline font-medium">
                  Learn how to spot fake tech support →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Download className="h-5 w-5 text-primary" />Get RustDesk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Official downloads:</p>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm"><a href={RUSTDESK_SITE} target="_blank" rel="noreferrer">Website</a></Button>
                <Button asChild variant="outline" size="sm"><a href={RUSTDESK_RELEASES} target="_blank" rel="noreferrer">All Releases</a></Button>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Windows: download .exe, run and allow</li>
                <li>macOS: download .dmg, open, allow permissions</li>
                <li>Linux/Android: use Releases page</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />How it works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>1) Open RustDesk — it shows your ID and a one‑time password.</p>
              <p>2) Share those with me below via WhatsApp. You can disconnect anytime.</p>
              <p>3) No permanent access is kept after the session.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" />Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Remote Support</strong>: R120 per session (up to 1 hour, most issues resolved).</p>
              <p><strong>On-Site Support</strong>: R400 callout + R150–R300/hour service fee, quoted upfront.</p>
              <Button asChild className="mt-3"><Link to="/pricing" data-testid="link-pricing">View Full Pricing Details</Link></Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border" id="share-details">
          <CardHeader>
            <CardTitle>Share Your Connection Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">RustDesk ID</Label>
                <Input 
                  id="id" 
                  value={id} 
                  onChange={handleIdChange} 
                  placeholder="e.g. 123 456 789" 
                  aria-describedby="id-error"
                  aria-invalid={!!idError}
                  data-testid="input-rustdesk-id"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {idError && (
                  <p id="id-error" className="text-red-500 text-sm" role="alert">
                    {idError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pwd">Password</Label>
                <Input 
                  id="pwd" 
                  value={pwd} 
                  onChange={handlePwdChange} 
                  placeholder="6-character alphanumeric" 
                  aria-describedby="pwd-error"
                  aria-invalid={!!pwdError}
                  data-testid="input-password"
                />
                {pwdError && (
                  <p id="pwd-error" className="text-red-500 text-sm" role="alert">
                    {pwdError}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button onClick={copyDetails} variant="outline" data-testid="button-copy"><Copy className="h-4 w-4" />Copy</Button>
              {validateRustDeskId(id) && validatePassword(pwd) ? (
                <Button asChild className="bg-success text-white">
                  <a href={whatsappHref} target="_blank" rel="noreferrer" data-testid="button-whatsapp"><MessageCircle className="h-4 w-4" />Send via WhatsApp</a>
                </Button>
              ) : (
                <Button 
                  className="bg-success text-white opacity-50 pointer-events-none" 
                  disabled 
                  data-testid="button-whatsapp-disabled"
                >
                  <MessageCircle className="h-4 w-4" />Send via WhatsApp
                </Button>
              )}
              <Button asChild variant="outline"><a href="tel:+27670494876" data-testid="button-call"><Phone className="h-4 w-4" />Call Me</a></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="container px-4 max-w-4xl mt-4">
        <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>Is Remote Support safe?</AccordionTrigger>
            <AccordionContent>
              Yes. You share a one‑time ID and password and can disconnect at any time. No unattended or permanent access is kept.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>What areas do you cover on‑site?</AccordionTrigger>
            <AccordionContent>
              Lombardy East (primary), with callouts to Alexandra (~3 km NW), Lakeside (~3 km NE), Kew (adjacent), Marlboro/Gautrain (~4 km N), Greenstone Mall (~10 min E), Sandton (~6–8 km NW) and Johannesburg CBD (~14 km W).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>What can be fixed remotely?</AccordionTrigger>
            <AccordionContent>
              Most software issues: Windows problems, setup, updates, malware cleanup, Wi‑Fi/printer configuration, and performance tuning.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>Do you provide remote IT support throughout Johannesburg?</AccordionTrigger>
            <AccordionContent>
              Yes! Our remote IT support service is available to anyone in Johannesburg and surrounding areas. Since it's remote, your physical location doesn't matter - as long as you have an internet connection, we can help. We're based in Lombardy East and also provide on-site support in nearby suburbs when hardware repairs are needed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2 className="text-xl font-semibold mb-3 mt-10 flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" />Related articles</h2>
        <ul className="list-disc pl-5 space-y-2">
          {posts
            .filter((p) => p.tags.includes("Remote Support") || p.tags.includes("Lombardy East"))
            .slice(0, 5)
            .map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="hover:text-primary">{p.title}</Link>
              </li>
            ))}
        </ul>
      </section>

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Get Remote IT Support in Johannesburg via RustDesk",
        description: "How to start a secure remote IT support session in Johannesburg using RustDesk for fast computer and network problem resolution.",
        step: [
          { "@type": "HowToStep", name: "Download RustDesk", text: "Open rustdesk.com and download the free remote support app for your Windows, Mac, or Linux device." },
          { "@type": "HowToStep", name: "Open and read your ID", text: "Open RustDesk and note the ID and one-time password displayed on your screen." },
          { "@type": "HowToStep", name: "Share via WhatsApp", text: "Share your RustDesk ID and password via WhatsApp to get instant remote IT support in Johannesburg." }
        ]
      }) }} />

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Is Remote Support safe?", acceptedAnswer: { "@type": "Answer", text: "Yes. You share a one‑time ID and password and can disconnect at any time." }},
          { "@type": "Question", name: "What areas do you cover on‑site?", acceptedAnswer: { "@type": "Answer", text: "Lombardy East with callouts to Edenvale, Bedfordview, Greenstone, Kempton Park and nearby suburbs." }},
          { "@type": "Question", name: "What can be fixed remotely?", acceptedAnswer: { "@type": "Answer", text: "Windows problems, setup, updates, malware cleanup, Wi‑Fi/printer configuration, performance tuning." }}
        ]
      }) }} />

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: window.location.origin + "/" },
          { "@type": "ListItem", position: 2, name: "Remote Support", item: window.location.origin + "/remote" }
        ]
      }) }} />

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Remote IT Support",
        provider: {
          "@type": "LocalBusiness",
          name: "BurbGigz IT Services",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lombardy East, Johannesburg",
            addressRegion: "Gauteng",
            addressCountry: "ZA"
          },
          telephone: "+27670494876"
        },
        areaServed: [
          "Lombardy East",
          "Edenvale",
          "Bedfordview",
          "Greenstone",
          "Sandton"
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "ZAR",
          price: "120",
          description: "Remote IT support session using RustDesk, starting at R120."
        }
      }) }} />

      <Footer />
    </div>
  );
};

export default Remote;
