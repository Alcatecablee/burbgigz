import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Copy, Phone, MessageCircle, Shield } from "lucide-react";

const RUSTDESK_SITE = "https://rustdesk.com/";
const RUSTDESK_RELEASES = "https://github.com/rustdesk/rustdesk/releases";

const Remote = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

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
        <div className="space-y-3 mb-8 text-center">
          <Badge variant="outline">Remote Support</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Start Remote Session (RustDesk)</h1>
          <p className="text-muted-foreground">Download RustDesk, read your one‑time ID & password, then share securely via WhatsApp.</p>
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
        </div>

        <Card className="bg-card border">
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
      <Footer />
    </div>
  );
};

export default Remote;
