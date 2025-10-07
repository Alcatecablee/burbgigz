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
    name: "Remote IT Support",
    description: "Professional remote troubleshooting via secure remote tools like RustDesk",
    price: "120",
    currency: "ZAR",
    provider: "BurbGigz IT Services",
    areaServed: ["Lombardy East", "Johannesburg", "Bedfordview", "Edenvale", "Alexandra", "Sandton"]
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
        title="Remote Support in Lombardy East | Start RustDesk Session - BurbGigz IT Services"
        description="Remote Support in Lombardy East, Johannesburg. Start a secure RustDesk session, share your one-time ID and password via WhatsApp for fast IT help from R120."
        keywords="Remote Support Lombardy East, RustDesk support, remote IT support Johannesburg, PC help Edenvale, laptop support Bedfordview, IT services Alexandra, computer repair Sandton"
        ogTitle="Remote Support in Lombardy East | Start RustDesk Session"
        ogDescription="Get professional remote IT help in Lombardy East. Secure RustDesk sessions starting from R120. Fast troubleshooting via WhatsApp."
        canonicalUrl="/remote"
        structuredData={structuredData}
      />
      <div className="container px-4 py-12 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4"><Link to="/" className="hover:text-primary">Home</Link><span className="mx-2">/</span><span className="text-foreground">Remote Support</span></nav>
        <div className="space-y-3 mb-8 text-center">
          <Badge variant="outline">Remote Support</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Remote Support in Lombardy East (RustDesk)</h1>
          <p className="text-muted-foreground">Fast, secure Remote Support for Johannesburg homes and small businesses. Download RustDesk, read your one‑time ID & password, then share securely via WhatsApp.</p>
        </div>

        <section className="mb-10 text-sm text-muted-foreground space-y-3">
          <p>
            Remote Support lets me connect to your computer securely to diagnose and fix issues without a callout. It’s ideal for
            Windows errors, slow PCs, Wi‑Fi/printer setup, email configuration and routine maintenance. For SSD upgrades or
            physical repairs, I offer on‑site service in Lombardy East and nearby suburbs.
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
        name: "Start Remote Support via RustDesk",
        description: "How to start a secure Remote Support session in Lombardy East using RustDesk.",
        step: [
          { "@type": "HowToStep", name: "Download RustDesk", text: "Open rustdesk.com and download the app for your device." },
          { "@type": "HowToStep", name: "Open and read your ID", text: "Open RustDesk and note the ID and one‑time password shown." },
          { "@type": "HowToStep", name: "Share via WhatsApp", text: "Paste your ID and password into WhatsApp and send." }
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
