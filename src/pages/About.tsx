import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Award, Phone, Mail, Shield } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import comptiaLogo from "@/assets/comptia-partner-badge.webp";
import microsoftLogo from "@/assets/microsoft-logo.webp";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Us | Clive - Certified IT Support Specialist in Lombardy East"
        description="Meet Clive, a certified IT support specialist with 9+ years of experience. CompTIA A+ and Network+ certified, providing professional IT services in Lombardy East and Johannesburg."
        keywords="Clive, IT support specialist, CompTIA A+ certified, Network+ certified, Lombardy East technician, professional IT services Johannesburg"
        ogTitle="About BurbGigz IT Services - Meet Your Certified IT Specialist"
        ogDescription="9+ years of professional IT support experience. CompTIA A+ and Network+ certified. Serving Lombardy East and surrounding areas with reliable, transparent service."
        canonicalUrl="/about"
      />
      
      <div className="container px-4 py-12">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="outline">About Us</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Meet Your IT Support Specialist</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional, certified, and transparent IT support you can trust
          </p>
        </div>

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-lg p-6 mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Why Trust Matters</h2>
          </div>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            In an industry plagued by scams and fake tech support, we stand out with verified credentials, 
            transparent pricing, and a commitment to consent-based service. No cold calls, no pressure tactics, 
            just honest help when you need it.
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Clive
              </CardTitle>
              <CardDescription>Certified IT Support Specialist</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Professional Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Experienced Customer Care and IT Support Specialist with over 9 years of experience 
                  providing technical support, resolving customer inquiries, and maintaining Point of Sale (POS) 
                  systems. Skilled in delivering excellent customer service, diagnosing hardware and software issues, 
                  and ensuring client satisfaction.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>0670494876</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>clive@burbgigz.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-success" />
                Certifications & Education
              </CardTitle>
              <CardDescription>Verified credentials and qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">CompTIA Certifications (Distinction)</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">CompTIA A+ Hardware/Architecture</p>
                      <p className="text-xs text-muted-foreground">Achieved with Distinction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">CompTIA A+ Software/Architecture</p>
                      <p className="text-xs text-muted-foreground">Achieved with Distinction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">CompTIA Network+ (N+)</p>
                      <p className="text-xs text-muted-foreground">Achieved with Distinction</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official CompTIA and Partner badges */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 text-sm">Official Partner Badges</h3>
                <div className="flex gap-4 items-center">
                  <img 
                    src={comptiaLogo} 
                    alt="CompTIA Authorized Partner" 
                    className="h-20 w-auto object-contain"
                  />
                  <img 
                    src={microsoftLogo} 
                    alt="Microsoft Partner" 
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Skills */}
        <Card className="bg-card border mb-12">
          <CardHeader>
            <CardTitle>Core Competencies</CardTitle>
            <CardDescription>Technical skills and expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Technical Support</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hardware & Software Diagnostics</li>
                  <li>• POS Systems Specialist</li>
                  <li>• Remote Support Tools</li>
                  <li>• CCTV Maintenance</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Networking</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• LAN/WAN Configuration</li>
                  <li>• Network Troubleshooting</li>
                  <li>• Wi-Fi Setup & Optimization</li>
                  <li>• Router Configuration</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Customer Service</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Salesforce CRM</li>
                  <li>• Client Retention</li>
                  <li>• Problem Resolution</li>
                  <li>• Technical Training</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Differentiators */}
        <Card className="bg-card border border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              How We're Different from Scams
            </CardTitle>
            <CardDescription>Our commitment to transparency and trust</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm">No Cold Calls or Pop-ups</p>
                  <p className="text-xs text-muted-foreground">We never initiate unsolicited contact or use fake virus alerts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Consent-Based Access</p>
                  <p className="text-xs text-muted-foreground">Remote access only with your explicit permission - you control everything</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Transparent Pricing</p>
                  <p className="text-xs text-muted-foreground">Fixed rates published upfront (R120 remote, from R400 on-site)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Verified Credentials</p>
                  <p className="text-xs text-muted-foreground">Real certifications, verifiable experience, physical location</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Secure Tools Only</p>
                  <p className="text-xs text-muted-foreground">We use encrypted, open-source tools like RustDesk - no sketchy software</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Local & Accountable</p>
                  <p className="text-xs text-muted-foreground">Based in Lombardy East with verifiable references and contact details</p>
                </div>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong>Concerned about scams?</strong> Visit our{" "}
                <Link to="/scam-awareness" className="text-primary hover:underline">Scam Awareness page</Link>{" "}
                to learn how to spot fake tech support and protect yourself.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default About;
