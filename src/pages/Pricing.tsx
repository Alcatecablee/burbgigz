import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Calculator, HardDrive, MapPin } from "lucide-react";

const suburbs = [
  { name: "Lombardy East", fee: 0 },
  { name: "Alexandra (~3 km NW)", fee: 50 },
  { name: "Lakeside (~3 km NE)", fee: 50 },
  { name: "Kew (adjacent)", fee: 50 },
  { name: "Marlboro (Gautrain, ~4 km N)", fee: 70 },
  { name: "Greenstone Mall (~10 min E)", fee: 90 },
  { name: "Sandton (~6–8 km NW)", fee: 120 },
  { name: "Johannesburg CBD (~14 km W)", fee: 150 },
];

const ssdBase = [
  { size: "500 GB", price: 900 },
  { size: "1 TB", price: 1300 },
  { size: "2 TB", price: 2200 },
];

const Pricing = () => {
  const [ssd, setSsd] = useState("500 GB");
  const [ram, setRam] = useState("8 GB");
  const [suburb, setSuburb] = useState(suburbs[0].name);
  const [onsite, setOnsite] = useState("remote");

  const ssdPrice = useMemo(() => ssdBase.find((s) => s.size === ssd)?.price ?? 0, [ssd]);
  const ramPrice = useMemo(() => (ram === "8 GB" ? 450 : ram === "16 GB" ? 850 : 0), [ram]);
  const service = useMemo(() => (onsite === "remote" ? 150 : 350), [onsite]);
  const callout = useMemo(() => (onsite === "on-site" ? (suburbs.find((s) => s.name === suburb)?.fee ?? 0) + 400 : 0), [onsite, suburb]);

  const total = ssdPrice + ramPrice + service + callout;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-12">
        <div className="text-center space-y-3 mb-8">
          <Badge variant="outline">Pricing</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Transparent Pricing & Instant Quotes</h1>
          <p className="text-muted-foreground">Estimate upgrades and service fees. Remote sessions are cheaper; on‑site adds a callout based on area.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HardDrive className="h-5 w-5 text-primary" />Upgrade Calculator</CardTitle>
              <CardDescription>Choose SSD/RAM to estimate parts + service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SSD Size</Label>
                  <Select value={ssd} onValueChange={setSsd}>
                    <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>
                      {ssdBase.map((s) => (
                        <SelectItem value={s.size} key={s.size}>{s.size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>RAM</Label>
                  <Select value={ram} onValueChange={setRam}>
                    <SelectTrigger><SelectValue placeholder="Select RAM" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8 GB">8 GB</SelectItem>
                      <SelectItem value="16 GB">16 GB</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select value={onsite} onValueChange={setOnsite}>
                    <SelectTrigger><SelectValue placeholder="Service type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="on-site">On‑Site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Area (for on‑site)</Label>
                  <Select value={suburb} onValueChange={setSuburb}>
                    <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                    <SelectContent>
                      {suburbs.map((s) => (
                        <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border p-3 text-sm">
                <div className="flex justify-between"><span>Parts (SSD + RAM)</span><span>R {ssdPrice + ramPrice}</span></div>
                <div className="flex justify-between"><span>Service ({onsite})</span><span>R {service}</span></div>
                <div className="flex justify-between"><span>Callout</span><span>R {callout}</span></div>
                <div className="flex justify-between font-semibold border-t mt-2 pt-2"><span>Total</span><span>R {total}</span></div>
              </div>

              <div className="flex gap-2">
                <Button asChild>
                  <a href={`https://wa.me/27670494876?text=${encodeURIComponent("Quote request: " + ssd + ", " + ram + ", " + onsite + ", " + suburb + " | Total R " + total)}`} target="_blank" rel="noreferrer"><Calculator className="h-4 w-4 mr-2" />Send Quote via WhatsApp</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/booking">Book Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />Callout Estimator</CardTitle>
              <CardDescription>Transparent on‑site fees by area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-1">
                {suburbs.map((s) => (
                  <li key={s.name} className="flex justify-between"><span>{s.name}</span><span className="text-foreground">R {400 + s.fee}</span></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
