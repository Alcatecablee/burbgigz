import { useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Copy, Phone, MessageCircle, Shield, BookOpen } from "lucide-react";

import { Link } from "react-router-dom";
import { posts } from "@/data/blog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const RUSTDESK_SITE = "https://rustdesk.com/";
const RUSTDESK_RELEASES = "https://github.com/rustdesk/rustdesk/releases";

const Remote = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    const title = "Remote Support in Lombardy East | Start RustDesk Session";
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta(
      "description",
      "Remote Support in Lombardy East, Johannesburg. Start a secure RustDesk session, share your one‑time ID and password via WhatsApp for fast IT help.",
    );
    setMeta(
      "keywords",
      "Remote Support Lombardy East, RustDesk support, remote IT support Johannesburg, PC help Edenvale, laptop support Bedfordview",
    );

    let link = document.querySelector('link[rel="canonical"]#canonical-remote') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      link.id = "canonical-remote";
      document.head.appendChild(link);
    }
    link.href = window.location.origin + "/remote";
  }, []);

  const whatsappHref = useMemo(() => {
    const base = "https://wa.me/27670494876";
    const text = `Remote Support Request (RustDesk)\nID: ${id || "<enter ID>"}\nPassword: ${pwd || "<enter password>"}\nLocation: Lombardy East`;
    return `${base}?text=${encodeURIComponent(text)}`;
  }, [id, pwd]);

  const copyDetails = async () => {
    const text = `RustDesk ID: ${id}\nPassword: ${pwd}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
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
        </div>

        <Card className="bg-card border" id="share-details">
          <CardHeader>
            <CardTitle>Share Your Connection Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">RustDesk ID</Label>
                <Input id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. 123 456 789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pwd">Password</Label>
                <Input id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="6‑digit password" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={copyDetails} variant="outline"><Copy className="h-4 w-4" />Copy</Button>
              <Button asChild className="bg-success text-white"><a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />Send via WhatsApp</a></Button>
              <Button asChild variant="outline"><a href="tel:+27670494876"><Phone className="h-4 w-4" />Call Me</a></Button>
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
              Lombardy East (primary), with callouts to Edenvale, Bedfordview, Greenstone, Kempton Park and nearby suburbs.
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

      <Footer />
    </div>
  );
};

export default Remote;
