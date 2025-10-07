import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, Shield, CheckCircle2, XCircle, ExternalLink, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ScamAwareness = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Avoid Tech Support Scams | Protect Yourself from Fake IT Support"
        description="Learn how to identify and avoid tech support scams including fake pop-ups, phishing emails, and impersonation calls. BurbGigz IT Services educates users on staying safe from cybercrime."
        keywords="tech support scams, fake virus alerts, avoid IT scams, phishing protection, fake tech support, scam awareness, cybersecurity Johannesburg"
        ogTitle="Avoid Tech Support Scams - Learn to Spot Fake IT Support"
        ogDescription="Protect yourself from tech support scams. Learn the warning signs of fake virus pop-ups, impersonation calls, and phishing attacks."
        canonicalUrl="/scam-awareness"
      />
      
      <div className="container px-4 py-12">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Scam Awareness
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Protect Yourself from Tech Support Scams</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn how to identify fake tech support and stay safe from scammers who impersonate 
            legitimate IT companies
          </p>
        </div>

        {/* Warning Alert */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-warning mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Tech Support Scams Are on the Rise</h2>
              <p className="text-muted-foreground mb-3">
                In 2025, tech support scams remain one of the most prevalent cyber threats. Scammers use fake 
                pop-ups, AI-generated voices, and sophisticated phishing tactics to steal money and personal information.
              </p>
              <p className="text-sm font-medium">
                <strong>Remember:</strong> Real companies like Microsoft, Apple, or legitimate IT support services 
                NEVER cold-call you about viruses or demand immediate remote access.
              </p>
            </div>
          </div>
        </div>

        {/* Top Scam Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Tech Support Scam Tactics in 2025</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  Fake Virus/Malware Pop-ups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Browser hijacks or malicious ads trigger full-screen alerts claiming "Virus Detected! Call Now!" 
                  with fake Microsoft/Apple logos.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Fake virus scans with urgent countdowns</li>
                  <li>• Pop-ups that lock your browser</li>
                  <li>• Instructions to call a "support number"</li>
                  <li>• Requests to download "security software"</li>
                </ul>
                <div className="bg-destructive/10 p-3 rounded-md">
                  <p className="text-xs font-medium">
                    <strong>What they want:</strong> Payment for fake fixes or remote access to steal data
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  Impersonation Calls & AI Voices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Scammers spoof caller IDs to appear as Microsoft, Apple, or antivirus companies, 
                  now using AI-generated voices for realism.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Fake caller ID (appears as "Microsoft Support")</li>
                  <li>• Claims of hacking, ransomware, or viruses</li>
                  <li>• Urgent demands for remote access</li>
                  <li>• Payment via gift cards or cryptocurrency</li>
                </ul>
                <div className="bg-destructive/10 p-3 rounded-md">
                  <p className="text-xs font-medium">
                    <strong>Recent variants:</strong> "Wallet compromised" alerts targeting crypto users
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  Phishing Emails & Text Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Unsolicited messages with links to fake sites that trigger pop-ups or download malware 
                  disguised as security alerts.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Emails claiming "Your PC is infected"</li>
                  <li>• Links to fake Microsoft/Apple support sites</li>
                  <li>• Malware downloads posing as "security fixes"</li>
                  <li>• Requests for login credentials</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  Browser Hijacks & Notification Spam
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Malicious browser extensions or sites that lock browsers, spam notifications, or inject 
                  fake tech support ads into legitimate search results.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Browser locked with "security warnings"</li>
                  <li>• Spam notifications about viruses</li>
                  <li>• Fake ads in Google search results</li>
                  <li>• Redirects to fake support sites</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Spot Scams */}
        <Card className="bg-card border border-success/20 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Shield className="h-5 w-5" />
              Red Flags: How to Spot a Tech Support Scam
            </CardTitle>
            <CardDescription>Warning signs that you're dealing with scammers, not legitimate support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">🚨 SCAM Warning Signs:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Unsolicited pop-ups or calls claiming virus detection</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Urgent pressure to act immediately or "within 5 minutes"</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Requests for remote access without your initiation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Payment via gift cards, wire transfer, or cryptocurrency</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm">No physical address or verifiable business information</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Claims to be from Microsoft/Apple but uses generic email</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">✅ LEGITIMATE Support Signs:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm">YOU contacted them first (not unsolicited)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Clear pricing published upfront on website</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Physical location and verifiable credentials</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Consent-based remote access (you approve first)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Professional communication, no pressure tactics</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Accepts standard payment methods (EFT, card)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What to Do */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What to Do if You Encounter a Scam</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-base">1. Don't Engage</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Close pop-ups immediately (don't call the number)</p>
                <p>• Hang up on unsolicited support calls</p>
                <p>• Don't click email/text links</p>
                <p>• Never download suggested "fixes"</p>
              </CardContent>
            </Card>

            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-base">2. Verify Independently</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Go directly to official websites (type URL)</p>
                <p>• Call official numbers (not from pop-up/email)</p>
                <p>• Check credentials and reviews</p>
                <p>• Verify physical location/business registration</p>
              </CardContent>
            </Card>

            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-base">3. Report & Protect</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Report to FTC (consumer.ftc.gov)</p>
                <p>• Change passwords if you gave access</p>
                <p>• Monitor bank/credit accounts</p>
                <p>• Run legitimate antivirus scan</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Questions About Tech Support Scams</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Will Microsoft or Apple ever call me about viruses?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  <strong>No.</strong> Microsoft, Apple, and legitimate tech companies NEVER make unsolicited calls 
                  about viruses, security issues, or computer problems. Any call claiming to be from these companies 
                  warning about infections is a scam. Always hang up immediately.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Are pop-up virus warnings real?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Most pop-up warnings with phone numbers are scams. Real virus alerts come from your installed 
                  antivirus software (like Windows Defender), not from websites. If a pop-up appears with a phone 
                  number and urgent warning, close it immediately without calling. Run a scan with your actual 
                  antivirus software instead.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>I gave a scammer remote access. What should I do?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Act immediately:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Disconnect from the internet (unplug ethernet or disable Wi-Fi)</li>
                    <li>Shut down your computer</li>
                    <li>Change all passwords from a different, secure device</li>
                    <li>Contact your bank if you provided financial information</li>
                    <li>Run a full virus/malware scan with legitimate antivirus</li>
                    <li>Consider professional help to remove any installed malware</li>
                    <li>Report the incident to FTC and local authorities</li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How can I tell if a tech support service is legitimate?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Legitimate services have:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Physical business address and local presence</li>
                    <li>Verifiable credentials and certifications (like CompTIA A+)</li>
                    <li>Clear pricing published on their website</li>
                    <li>Professional website with proper contact information</li>
                    <li>Real customer reviews on Google/Facebook</li>
                    <li>Never use pop-ups or cold calls to solicit business</li>
                    <li>Explain remote access tools and require your consent</li>
                    <li>Accept standard payment methods (no gift cards)</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What payment methods do scammers prefer?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Scammers prefer untraceable payment methods: <strong>gift cards</strong> (iTunes, Google Play, Steam), 
                  <strong>wire transfers</strong> (Western Union, MoneyGram), and <strong>cryptocurrency</strong> (Bitcoin, etc.). 
                  Legitimate businesses accept credit cards, debit cards, EFT, and invoices. If someone insists on gift 
                  cards or crypto for IT support, it's 100% a scam.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Official Resources */}
        <Card className="bg-card border mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              Official Resources & Reporting
            </CardTitle>
            <CardDescription>Trusted sources for scam information and reporting fraud</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 text-sm">Report Scams:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <a href="https://consumer.ftc.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">FTC Consumer Protection</a></li>
                  <li>• <a href="https://www.microsoft.com/reportascam" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Report a Scam</a></li>
                  <li>• Local authorities and consumer protection agencies</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm">Learn More:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <a href="https://support.microsoft.com/avoid-tech-scams" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft: Avoid Tech Support Scams</a></li>
                  <li>• <a href="https://support.apple.com/avoid-scams" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple: Identify Legitimate Emails</a></li>
                  <li>• FBI Internet Crime Complaint Center (IC3)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How BurbGigz is Different */}
        <Card className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              How BurbGigz IT Services is Different
            </CardTitle>
            <CardDescription>Our commitment to transparent, trustworthy service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">What We NEVER Do:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>❌ Cold call or send unsolicited pop-ups</li>
                  <li>❌ Demand immediate action or payment</li>
                  <li>❌ Request gift cards or crypto</li>
                  <li>❌ Use fake urgency or scare tactics</li>
                  <li>❌ Access your PC without consent</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">What We Always Do:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✅ Wait for you to contact us first</li>
                  <li>✅ Provide transparent, upfront pricing</li>
                  <li>✅ Explain tools like RustDesk clearly</li>
                  <li>✅ Require your explicit consent for remote access</li>
                  <li>✅ Give you full control (end session anytime)</li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm mb-4">
                <strong>Our credentials are verifiable:</strong> 9+ years experience, CompTIA A+ & Network+ certified 
                (Distinction), based in Lombardy East with real contact details and references.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/about">View Our Credentials</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/remote">
                    <Shield className="mr-2 h-4 w-4" />
                    Safe Remote Support
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://wa.me/27670494876" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ScamAwareness;
