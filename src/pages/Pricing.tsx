import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMemo, useState } from "react";
import { Calculator, HardDrive, MapPin, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

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
  { size: "None", price: 0 },
  { size: "500 GB", price: 900 },
  { size: "1 TB", price: 1300 },
  { size: "2 TB", price: 2200 },
];

const services = [
  { name: "Software Troubleshooting", price: 120 },
  { name: "Malware Removal", price: 200 },
  { name: "Wi-Fi/Printer Setup", price: 180 },
  { name: "Full System Optimization", price: 250 },
  { name: "Hardware Upgrade Only", price: 150 },
];

const Pricing = () => {
  const [ssd, setSsd] = useState("None");
  const [ram, setRam] = useState("None");
  const [serviceType, setServiceType] = useState(services[0].name);
  const [suburb, setSuburb] = useState(suburbs[0].name);
  const [onsite, setOnsite] = useState("remote");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const ssdPrice = useMemo(() => ssdBase.find((s) => s.size === ssd)?.price ?? 0, [ssd]);
  const ramPrice = useMemo(() => (ram === "8 GB" ? 450 : ram === "16 GB" ? 850 : 0), [ram]);
  const servicePrice = useMemo(() => services.find((s) => s.name === serviceType)?.price ?? 0, [serviceType]);
  const callout = useMemo(() => (onsite === "on-site" ? (suburbs.find((s) => s.name === suburb)?.fee ?? 0) + 400 : 0), [onsite, suburb]);

  const total = ssdPrice + ramPrice + servicePrice + callout;

  // Clear error when relevant fields change
  const clearErrorOnChange = () => {
    if (error) setError("");
  };

  const validateForm = () => {
    // Only require SSD/RAM for hardware upgrade services
    const requiresHardware = serviceType === "Hardware Upgrade Only";
    if (requiresHardware && ssd === "None" && ram === "None") {
      const message = "Please select at least an SSD or RAM upgrade for hardware services.";
      setError(message);
      return { ok: false, message };
    }
    if (onsite === "on-site" && !suburb) {
      const message = "Please select a suburb for on-site service.";
      setError(message);
      return { ok: false, message };
    }
    setError("");
    return { ok: true, message: "" };
  };

  const handleWhatsAppClick = () => {
    const validation = validateForm();
    if (!validation.ok) {
      toast({
        title: "Validation Error",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    setIsModalOpen(true);
  };

  const confirmAndSend = () => {
    toast({
      title: "Success",
      description: "Quote confirmed! Opening WhatsApp..."
    });
    setIsModalOpen(false);
  };

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
              <TooltipProvider>
                {error && <p id="validation-error" className="text-red-500 text-sm" role="alert" data-testid="validation-error">{error}</p>}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="flex items-center gap-1 cursor-help">
                            SSD Size
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Solid State Drive for faster storage and boot times</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select value={ssd} onValueChange={(value) => { setSsd(value); clearErrorOnChange(); }}>
                      <SelectTrigger data-testid="select-ssd" aria-invalid={!!error} aria-describedby={error ? "validation-error" : undefined}><SelectValue placeholder="Select size" /></SelectTrigger>
                      <SelectContent>
                        {ssdBase.map((s) => (
                          <SelectItem value={s.size} key={s.size}>
                            {s.size} {s.price > 0 && `(R${s.price})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="flex items-center gap-1 cursor-help">
                            RAM
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Memory upgrade for better multitasking performance</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select value={ram} onValueChange={(value) => { setRam(value); clearErrorOnChange(); }}>
                      <SelectTrigger data-testid="select-ram" aria-invalid={!!error} aria-describedby={error ? "validation-error" : undefined}><SelectValue placeholder="Select RAM" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8 GB">8 GB (R450)</SelectItem>
                        <SelectItem value="16 GB">16 GB (R850)</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select value={serviceType} onValueChange={(value) => { setServiceType(value); clearErrorOnChange(); }}>
                    <SelectTrigger data-testid="select-service" aria-invalid={!!error} aria-describedby={error ? "validation-error" : undefined}><SelectValue placeholder="Select service" /></SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.name} value={s.name}>
                          {s.name} (R{s.price})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Visit Type</Label>
                    <Select value={onsite} onValueChange={(value) => { setOnsite(value); clearErrorOnChange(); }}>
                      <SelectTrigger data-testid="select-visit-type" aria-invalid={!!error} aria-describedby={error ? "validation-error" : undefined}><SelectValue placeholder="Service type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote Support</SelectItem>
                        <SelectItem value="on-site">On-Site Visit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className={`flex items-center gap-1 cursor-help ${onsite !== "on-site" ? "text-muted-foreground" : ""}`}>
                            Area (for on-site)
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Callout fee varies by distance from Lombardy East</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select value={suburb} onValueChange={(value) => { setSuburb(value); clearErrorOnChange(); }} disabled={onsite !== "on-site"}>
                      <SelectTrigger data-testid="select-suburb" aria-invalid={!!error} aria-describedby={error ? "validation-error" : undefined}><SelectValue placeholder="Select area" /></SelectTrigger>
                      <SelectContent>
                        {suburbs.map((s) => (
                          <SelectItem key={s.name} value={s.name}>
                            {s.name} (R{400 + s.fee})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border p-3 text-sm" data-testid="price-breakdown">
                  <div className="flex justify-between"><span>Parts (SSD + RAM)</span><span>R {(ssdPrice + ramPrice).toFixed(0)}</span></div>
                  <div className="flex justify-between"><span>Service ({serviceType})</span><span>R {servicePrice.toFixed(0)}</span></div>
                  <div className="flex justify-between"><span>Callout ({onsite})</span><span>R {callout.toFixed(0)}</span></div>
                  <div className="flex justify-between font-semibold border-t mt-2 pt-2"><span>Total</span><span>R {total.toFixed(0)}</span></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleWhatsAppClick} data-testid="button-quote">
                    <Calculator className="h-4 w-4 mr-2" />Send Quote via WhatsApp
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/booking" data-testid="button-booking">Book Now</Link>
                  </Button>
                </div>
                
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Confirm Your Quote</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <p><strong>SSD</strong>: {ssd} {ssdPrice > 0 && `(R${ssdPrice})`}</p>
                      <p><strong>RAM</strong>: {ram} {ramPrice > 0 && `(R${ramPrice})`}</p>
                      <p><strong>Service</strong>: {serviceType} (R{servicePrice})</p>
                      <p><strong>Visit</strong>: {onsite === "remote" ? "Remote Support" : `On-site at ${suburb}`} {callout > 0 && `(R${callout})`}</p>
                      <div className="border-t pt-2 font-semibold">
                        <p><strong>Total</strong>: R{total}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button asChild onClick={confirmAndSend}>
                        <a
                          href={`https://wa.me/27670494876?text=${encodeURIComponent(
                            `Quote request:\nSSD: ${ssd}\nRAM: ${ram}\nService: ${serviceType}\nVisit: ${onsite === "remote" ? "Remote" : suburb}\nTotal: R${total}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          data-testid="button-confirm-quote"
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
              </TooltipProvider>
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
