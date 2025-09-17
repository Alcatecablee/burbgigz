import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { Calculator, HardDrive, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { suburbsTransportEstimates, transportOptions } from "@/data/transport";

const ssdBase = [
  { size: "None", price: 0 },
  { size: "500 GB", price: 900 },
  { size: "1 TB", price: 1300 },
  { size: "2 TB", price: 2200 },
];

const Pricing = () => {
  const [ssd, setSsd] = useState("None");
  const [ram, setRam] = useState("8 GB");
  const [suburb, setSuburb] = useState("Lombardy East");
  const [onsite, setOnsite] = useState("remote");
  const [transport, setTransport] = useState("fixed");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const ssdPrice = useMemo(() => ssdBase.find((s) => s.size === ssd)?.price ?? 0, [ssd]);
  const ramPrice = useMemo(() => (ram === "8 GB" ? 450 : ram === "16 GB" ? 850 : 0), [ram]);
  const service = useMemo(() => (onsite === "remote" ? 150 : 350), [onsite]);

  const callout = useMemo(() => {
    if (onsite !== "on-site") return 0;
    if (transport === "client_account") {
      // Client covers; no add-on
      return 400;
    }
    if (transport === "my_account") {
      // Dynamic estimate based on suburb (static; explain live in tooltip)
      const est = suburbsTransportEstimates[suburb]?.uber || "R100"; // Use Uber as default; parse for calc if needed
      // For demo, add average (e.g., parse midpoint); in prod, use API
      const avgEst = parseFloat(est.match(/\d+/)?.[0] || "100") + 50; // Simple parse + buffer
      return 400 + avgEst;
    }
    // Fixed
    const fixedAddOn = { "Lombardy East": 0, "Alexandra (~3 km NW)": 50, "Lakeside (~3 km NE)": 50, "Kew (adjacent)": 50, "Marlboro (Gautrain, ~4 km N)": 70, "Greenstone Mall (~10 min E)": 90, "Sandton (~6–8 km NW)": 120, "Johannesburg CBD (~14 km W)": 150 }[suburb] || 0;
    return 400 + fixedAddOn;
  }, [onsite, suburb, transport]);

  const total = ssdPrice + ramPrice + service + callout;

  const validateForm = () => {
    if (ssd === "None" && ram === "None") {
      setError("Select at least SSD or RAM.");
      return false;
    }
    if (onsite === "on-site" && !suburb) {
      setError("Select a suburb for on-site.");
      return false;
    }
    setError("");
    return true;
  };

  const handleWhatsAppClick = () => {
    if (!validateForm()) {
      toast({ title: "Error", description: error, variant: "destructive" });
      return;
    }
    setIsModalOpen(true);
  };

  const handleBookingClick = () => {
    // Analytics tracking can be added here
  };

  const quoteText = `Quote request: SSD ${ssd} (R${ssdPrice}), RAM ${ram} (R${ramPrice}), Service ${onsite} (R${service}), Callout ${transport} to ${suburb} (R${callout}) | Total R${total}. Transport note: If client account, use your Uber/Bolt discounts!`;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-12">
          <div className="text-center space-y-3 mb-8">
            <Badge variant="outline">Pricing</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold">Transparent Pricing & Instant Quotes</h1>
            <p className="text-muted-foreground">Calculate costs with flexible transport options—use Uber/Bolt estimates or your discounts for savings.</p>
          </div>

          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HardDrive className="h-5 w-5 text-primary" />Upgrade Calculator</CardTitle>
              <CardDescription>Choose options; transport adapts dynamically.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label>SSD Size</Label>
                    </TooltipTrigger>
                    <TooltipContent>Fast storage upgrade (R900–R2200 incl. install) or None.</TooltipContent>
                  </Tooltip>
                  <Select value={ssd} onValueChange={setSsd}>
                    <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>
                      {ssdBase.map((s) => <SelectItem key={s.size} value={s.size}>{s.size} (R{s.price})</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label>RAM</Label>
                    </TooltipTrigger>
                    <TooltipContent>Memory boost for multitasking (R450–R850).</TooltipContent>
                  </Tooltip>
                  <Select value={ram} onValueChange={setRam}>
                    <SelectTrigger><SelectValue placeholder="Select RAM" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8 GB">8 GB (R450)</SelectItem>
                      <SelectItem value="16 GB">16 GB (R850)</SelectItem>
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
                      <SelectItem value="remote">Remote (R150)</SelectItem>
                      <SelectItem value="on-site">On-Site (R350 + callout)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Area (for on-site)</Label>
                  <Select value={suburb} onValueChange={setSuburb} disabled={onsite !== "on-site"}>
                    <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(suburbsTransportEstimates).map((s) => (
                        <SelectItem key={s} value={s}>{s} ({suburbsTransportEstimates[s].distance})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label>Transport Option</Label>
                  </TooltipTrigger>
                  <TooltipContent>Choose how to handle travel—fixed for predictability, Uber/Bolt for dynamic costs, or client account to use your discounts (waives add-on).</TooltipContent>
                </Tooltip>
                <Select value={transport} onValueChange={setTransport} disabled={onsite !== "on-site"}>
                  <SelectTrigger><SelectValue placeholder="Select transport" /></SelectTrigger>
                  <SelectContent>
                    {transportOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div>
                          <div>{opt.label}</div>
                          {opt.description && <div className="text-xs text-muted-foreground">{opt.description}</div>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {transport === "my_account" && suburb && (
                  <p className="text-sm text-muted-foreground">
                    Est. Uber/Bolt to {suburb}: {suburbsTransportEstimates[suburb]?.uber} (Uber) / {suburbsTransportEstimates[suburb]?.bolt} (Bolt). Live quote via app before job.
                  </p>
                )}
                {transport === "client_account" && (
                  <p className="text-sm text-muted-foreground">
                    Apply your discounts (e.g., Uber 20% off promo or Bolt R75 referral). Book ride to/from Lombardy East—share ETA via WhatsApp.
                  </p>
                )}
              </div>

              <div className="rounded-md border p-3 text-sm">
                <div className="flex justify-between"><span>Parts (SSD + RAM)</span><span>R{(ssdPrice + ramPrice).toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Service ({onsite})</span><span>R{service.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Callout ({transport})</span><span>R{callout.toFixed(0)}</span></div>
                <div className="flex justify-between font-semibold border-t mt-2 pt-2"><span>Total</span><span>R{total.toFixed(0)}</span></div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleWhatsAppClick} disabled={!!error}>
                  <Calculator className="h-4 w-4 mr-2" />Send Quote via WhatsApp
                </Button>
                <Button variant="outline" onClick={handleBookingClick} asChild>
                  <a href="/booking">Book Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Your Quote</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                <p><strong>SSD</strong>: {ssd} (R{ssdPrice})</p>
                <p><strong>RAM</strong>: {ram} {ramPrice > 0 && `(R${ramPrice})`}</p>
                <p><strong>Service</strong>: {onsite === "remote" ? "Remote Support" : "On-Site Visit"} (R{service})</p>
                <p><strong>Transport</strong>: {transportOptions.find(opt => opt.value === transport)?.label} {callout > 0 && `(R${callout})`}</p>
                <p><strong>Location</strong>: {onsite === "on-site" ? suburb : "Remote"}</p>
                <div className="border-t pt-2 font-semibold">
                  <p><strong>Total</strong>: R{total}</p>
                </div>
                {transport === "client_account" && onsite === "on-site" && (
                  <p className="text-xs text-muted-foreground mt-2">Remember to book your Uber/Bolt to Lombardy East and apply any available discounts!</p>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button asChild>
                  <a
                    href={`https://wa.me/27670494876?text=${encodeURIComponent(quoteText)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      toast({
                        title: "Success",
                        description: "Quote confirmed! Opening WhatsApp..."
                      });
                      setIsModalOpen(false);
                    }}
                  >
                    Confirm and Send
                  </a>
                </Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default Pricing;