import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Copy, Phone, MessageCircle, Shield, BookOpen, DollarSign, Zap, Check, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/data/seoStructuredData";
import anydeskLogo from "@/assets/anydesk-logo.png";
import remoteSupportImage from "@/assets/remote-support-tech.jpg";

import { Link } from "react-router-dom";
import { posts } from "@/data/blog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ANYDESK_SITE = "https://anydesk.com/";
const ANYDESK_DOWNLOAD = "https://anydesk.com/en/downloads";

const validateAnyDeskId = (id: string) => /^[0-9]{9}$/.test(id.replace(/\s/g, ""));
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
      answer: "I use secure remote tools like AnyDesk to connect to your computer with your permission. You can see everything I do and end the session at any time."
    },
    {
      question: "Is remote support secure?",
      answer: "Yes, I use encrypted connections and require your explicit permission. You remain in full control of your computer throughout the session. You share a one-time ID and password and can disconnect at any time."
    },
    {
      question: "What can be fixed remotely?",
      answer: "Most software issues including slow performance, virus removal, Windows errors, Wi-Fi setup, software installation, system optimization, malware cleanup, and printer configuration."
    },
    {
      question: "How much does remote support cost?",
      answer: "Remote support sessions start from R120, which is much more affordable than on-site callouts starting at R400."
    },
    {
      question: "What areas do you cover for on-site support?",
      answer: "I'm based in Lombardy East with callouts to Edenvale, Bedfordview, Greenstone, Kempton Park and nearby suburbs including Alexandra, Sandton, and Johannesburg CBD."
    },
    {
      question: "Do you provide remote IT support throughout Johannesburg?",
      answer: "Yes! My remote IT support service is available to anyone in Johannesburg and surrounding areas. Since it's remote, your physical location doesn't matter - as long as you have an internet connection, I can help."
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
    setIdError(validateAnyDeskId(value) ? "" : "ID must be 9 digits");
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);
    setPwdError(validatePassword(value) ? "" : "Password must be 6 alphanumeric characters");
  };

  const whatsappHref = useMemo(() => {
    const base = "https://wa.me/27670494876";
    const text = `Remote Support Request (AnyDesk)\nID: ${id || "<enter ID>"}\nPassword: ${pwd || "<enter password>"}\nLocation: Lombardy East`;
    return `${base}?text=${encodeURIComponent(text)}`;
  }, [id, pwd]);

  const copyDetails = async () => {
    if (!validateAnyDeskId(id) || !validatePassword(pwd)) {
      toast({
        title: "Error",
        description: "Please enter a valid AnyDesk ID and password.",
        variant: "destructive"
      });
      return;
    }
    const text = `AnyDesk ID: ${id}\nPassword: ${pwd}`;
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Success",
        description: "AnyDesk details copied to clipboard!"
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
        title="Fix Laptop Remotely South Africa | Urgent Remote IT Help Johannesburg from R120"
        description="Need urgent IT help? I fix laptops remotely today. Affordable remote IT support in Johannesburg from R120. Same-day service for slow PCs, virus removal, Wi-Fi issues & Windows errors. No callout needed. Secure, fast & professional."
        keywords="fix laptop remotely South Africa, urgent remote IT help Johannesburg, affordable remote IT support, remote PC repair Johannesburg, same day remote IT support, cheap remote computer repair, remote virus removal Johannesburg, fix computer remotely Johannesburg, emergency remote IT support, remote IT help South Africa, remote desktop support Johannesburg, remote troubleshooting, remote IT support Lombardy East, remote tech support Johannesburg"
        ogTitle="Fix Laptop Remotely South Africa | Urgent Remote IT Help from R120"
        ogDescription="Urgent IT issue? I fix laptops remotely today. Professional remote IT support from R120. Same-day service, secure connections, no callout needed."
        canonicalUrl="/remote"
        structuredData={structuredData}
      />
      <div className="container px-4 py-12 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4"><Link to="/" className="hover:text-primary">Home</Link><span className="mx-2">/</span><span className="text-foreground">Remote Support</span></nav>
        <div className="space-y-3 mb-8 text-center">
          <Badge variant="outline">
            <Zap className="h-3 w-3 mr-1" />
            Urgent Remote IT Help
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Fix Your Laptop Remotely - Today</h1>
          <p className="text-muted-foreground text-lg">Fast, affordable remote IT support in Johannesburg from <span className="font-semibold text-foreground">R120</span>. No callout needed - we fix it while you watch.</p>
          <p className="text-sm text-muted-foreground">Same-day service • Secure connections • Serving all Johannesburg areas remotely</p>
          
          {/* Availability Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Available 24/7
            </Badge>
            <span className="text-muted-foreground">• Avg response: 15 mins</span>
          </div>
          <p className="text-xs text-muted-foreground">After-hours support available (additional fee applies)</p>
        </div>

        {/* Process Timeline */}
        <section className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">1</div>
              <span className="font-medium">Contact</span>
            </div>
            <div className="hidden md:block text-muted-foreground">→</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">2</div>
              <span className="font-medium">15 min response</span>
            </div>
            <div className="hidden md:block text-muted-foreground">→</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">3</div>
              <span className="font-medium">Session starts</span>
            </div>
            <div className="hidden md:block text-muted-foreground">→</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">4</div>
              <span className="font-medium">Fixed (~30 mins)</span>
            </div>
          </div>
        </section>

        {/* Real Examples Section */}
        <section className="mb-10 bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Real Examples of What We Fix</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-background rounded-lg border">
              <p className="font-semibold text-primary mb-2">Slow Windows 11 Laptop</p>
              <p className="text-muted-foreground text-xs mb-2">Fixed in 15 mins • R120</p>
              <p className="text-muted-foreground">Startup programs cleaned, temp files removed, system optimized</p>
            </div>
            <div className="p-4 bg-background rounded-lg border">
              <p className="font-semibold text-primary mb-2">Malware Infection</p>
              <p className="text-muted-foreground text-xs mb-2">Cleaned in 35 mins • R120</p>
              <p className="text-muted-foreground">Malware removed, security patches applied, browser cleaned</p>
            </div>
            <div className="p-4 bg-background rounded-lg border">
              <p className="font-semibold text-primary mb-2">WiFi Keeps Dropping</p>
              <p className="text-muted-foreground text-xs mb-2">Diagnosed in 20 mins • R120</p>
              <p className="text-muted-foreground">Network drivers updated, DNS configured, connection stable</p>
            </div>
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="mb-10 bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Our Remote IT Support in Johannesburg?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Fast Response Time
              </h3>
              <p className="text-muted-foreground">Get help within minutes, not hours. Most remote IT support issues in Johannesburg are resolved in under 30 minutes, minimizing your downtime and keeping your business productive.</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost-Effective Solution
              </h3>
              <p className="text-muted-foreground">Save money with remote IT support from just R120 per session - no travel costs, no waiting for technicians. Much more affordable than traditional on-site callouts (R400+).</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Secure & Professional
              </h3>
              <p className="text-muted-foreground">15+ years of IT experience with CompTIA A+ and Network+ certifications. Encrypted connections, transparent service, and you stay in full control throughout the session.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section - PLACEHOLDER */}
        <section className="mb-10 bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            What My Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-background rounded-lg border">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-3">"Fixed my slow laptop in 20 mins via WhatsApp - brilliant! Saved me time and money."</p>
              <p className="text-xs font-semibold">- Sarah M., Bedfordview</p>
            </div>
            <div className="p-4 bg-background rounded-lg border">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-3">"Professional service, very quick response. Removed virus completely and my computer works perfectly now."</p>
              <p className="text-xs font-semibold">- John D., Edenvale</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Thousands of remote sessions completed since 2010 across Johannesburg
          </p>
        </section>

        {/* What I Fix Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Remote IT Support Services in Johannesburg</h2>
          <p className="text-muted-foreground mb-4">I can quickly diagnose and fix a wide range of computer and network issues remotely:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-lg">Software & System Issues</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Slow computer performance & optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Windows errors, crashes & blue screens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Software installation & updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Virus & malware removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>System tune-ups & cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Data backup configuration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-lg">Network & Connectivity</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>WiFi & internet connection problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Email configuration (Outlook, Gmail, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Printer setup & troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>VPN setup for remote work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Network troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Cloud services configuration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-sm text-muted-foreground space-y-3">
              <h2 className="text-2xl font-semibold text-foreground mb-3">How Remote IT Support Works</h2>
              <p>
                Remote IT support allows me to securely connect to your computer in Johannesburg and fix most software issues without a physical visit. Using secure, encrypted remote desktop tools like AnyDesk, I can diagnose problems, install updates, remove viruses, configure settings, and optimize performance - all while you watch on your screen.
              </p>
              <p>
                This approach is perfect for busy professionals and small businesses in Johannesburg who need fast IT support without disrupting their workflow. For hardware issues like SSD upgrades or physical repairs, I provide professional on-site IT support throughout Lombardy East, Edenvale, Bedfordview, and nearby Johannesburg suburbs.
              </p>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={remoteSupportImage} 
                alt="Professional IT technician providing remote support" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Security & Trust Banner */}
        <div className="bg-card border border-success/20 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-success mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Safe, Secure, Consent-Based Remote Access</h2>
              <p className="text-sm text-muted-foreground">
                <strong>Unlike tech support scams,</strong> we NEVER cold-call, send pop-ups, or demand immediate access. 
                AnyDesk is a secure, trusted tool that requires YOUR permission. You see everything we do, and you 
                can end the session instantly at any time. No permanent access, no hidden software, no pressure tactics.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Encrypted Connection
                </Badge>
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  You Control Access
                </Badge>
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Trusted Software
                </Badge>
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  No Permanent Access
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
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Get AnyDesk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-center mb-4">
                <img src={anydeskLogo} alt="AnyDesk" className="h-8" />
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-3">
                <p className="font-semibold text-primary mb-1">Don't worry - it's quick & easy!</p>
                <p className="text-xs text-muted-foreground">Small download (~3MB) • Takes 2 minutes • Free & trusted</p>
              </div>
              <p>Official download:</p>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm"><a href={ANYDESK_SITE} target="_blank" rel="noreferrer">Website</a></Button>
                <Button asChild variant="outline" size="sm"><a href={ANYDESK_DOWNLOAD} target="_blank" rel="noreferrer">Download Page</a></Button>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Windows: download .exe and run</li>
                <li>macOS: download .dmg and install</li>
                <li>Linux/Android: available on Downloads page</li>
              </ul>
              <div className="mt-3 p-3 bg-background border rounded-lg">
                <p className="text-xs font-semibold mb-1">Stuck installing?</p>
                <Button asChild variant="link" size="sm" className="h-auto p-0 text-primary">
                  <a href="tel:+27670494876">Call me: 067 049 4876 - I'll guide you through it</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />How it works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>1) Open AnyDesk — it shows your 9-digit ID and password.</p>
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
              <p><strong>After-Hours Support</strong>: R180 per session (10pm-7am weekdays, weekends).</p>
              <p><strong>On-Site Support</strong>: R400 callout + R150–R300/hour service fee, quoted upfront.</p>
              <Button asChild className="mt-3"><Link to="/pricing" data-testid="link-pricing">View Full Pricing Details</Link></Button>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Can't Use AnyDesk?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">No problem! We also support:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>RustDesk</li>
                <li>TeamViewer</li>
                <li>Phone-guided troubleshooting</li>
              </ul>
              <p className="text-xs mt-2">Having trouble? Call me at <strong className="text-primary">067 049 4876</strong> and I'll walk you through it step by step.</p>
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
                <Label htmlFor="id">AnyDesk ID</Label>
                <Input 
                  id="id" 
                  value={id} 
                  onChange={handleIdChange} 
                  placeholder="e.g. 123456789" 
                  aria-describedby="id-error"
                  aria-invalid={!!idError}
                  data-testid="input-anydesk-id"
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
              {validateAnyDeskId(id) && validatePassword(pwd) ? (
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
        name: "Get Remote IT Support in Johannesburg via AnyDesk",
        description: "How to start a secure remote IT support session in Johannesburg using AnyDesk for fast computer and network problem resolution.",
        step: [
          { "@type": "HowToStep", name: "Download AnyDesk", text: "Open anydesk.com and download the free remote support app for your Windows, Mac, or Linux device." },
          { "@type": "HowToStep", name: "Open and read your ID", text: "Open AnyDesk and note the 9-digit ID and password displayed on your screen." },
          { "@type": "HowToStep", name: "Share via WhatsApp", text: "Share your AnyDesk ID and password via WhatsApp to get instant remote IT support in Johannesburg." }
        ]
      }) }} />

      <Footer />
    </div>
  );
};

export default Remote;
