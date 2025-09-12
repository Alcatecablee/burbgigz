import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";

const timeSlots = ["09:00", "11:00", "14:00", "16:00"];
const services = ["Remote Support", "On‑Site Callout", "SSD Upgrade", "Wi‑Fi/Printer Setup"];
const areas = ["Lombardy East", "Alexandra", "Lakeside", "Kew", "Marlboro", "Greenstone", "Sandton", "Johannesburg CBD"];

// Pricing aligned with Pricing.tsx component
const servicePrices: Record<string, number> = {
  "Remote Support": 150,
  "On‑Site Callout": 400,
  "SSD Upgrade": 350,
  "Wi‑Fi/Printer Setup": 180,
};

const areaFees: Record<string, number> = {
  "Lombardy East": 0,
  "Alexandra": 50,
  "Lakeside": 50,
  "Kew": 50,
  "Marlboro": 70,
  "Greenstone": 90,
  "Sandton": 120,
  "Johannesburg CBD": 150,
};

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [service, setService] = useState(services[0]);
  const [area, setArea] = useState(areas[0]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitMethod, setSubmitMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const { toast } = useToast();

  // Clear error when relevant fields change
  const clearErrorOnChange = () => {
    if (error) setError("");
  };

  const validateForm = () => {
    if (!name.trim()) {
      const message = "Please enter your name.";
      setError(message);
      return { ok: false, message };
    }
    if (!date) {
      const message = "Please select a date.";
      setError(message);
      return { ok: false, message };
    }
    if (!time) {
      const message = "Please select a time slot.";
      setError(message);
      return { ok: false, message };
    }
    if (!service || !areas.includes(area)) {
      const message = "Please select a valid service and area.";
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
    setSubmitMethod('whatsapp');
    setIsModalOpen(true);
  };

  const handleEmailClick = () => {
    const validation = validateForm();
    if (!validation.ok) {
      toast({
        title: "Validation Error",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    setSubmitMethod('email');
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    if (submitMethod === 'whatsapp') {
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: "Opening WhatsApp to send your booking request!"
      });
      window.open(`https://wa.me/27670494876?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: "Opening email to send your booking request!"
      });
      window.open(`mailto:clive@dealeeoo.com?subject=${encodeURIComponent("Booking request")}&body=${encodeURIComponent(text)}`);
    }
  };

  // Calculate estimated cost
  const estimatedCost = useMemo(() => {
    const basePrice = servicePrices[service] || 150;
    const isOnSite = service === "On‑Site Callout" || service === "SSD Upgrade" || service === "Wi‑Fi/Printer Setup";
    const calloutFee = isOnSite ? (areaFees[area] || 0) : 0;
    return basePrice + calloutFee;
  }, [service, area]);

  const text = useMemo(() => {
    return `Booking request:\nName: ${name || "(your name)"}\nService: ${service}\nDate: ${date ? date.toDateString() : "(pick date)"} ${time || "(pick time)"}\nArea: ${area}\nEstimated Cost: R${estimatedCost}`;
  }, [name, service, date, time, area, estimatedCost]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-12 max-w-3xl">
        <div className="text-center space-y-3 mb-8">
          <Badge variant="outline">Bookings</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Book a Time</h1>
          <p className="text-muted-foreground">Choose a date and slot. You’ll confirm via WhatsApp instantly.</p>
        </div>

        <Card className="bg-card border">
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {error && <p id="validation-error" className="text-red-500 text-sm col-span-2" role="alert" data-testid="validation-error">{error}</p>}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  value={name} 
                  onChange={(e) => { setName(e.target.value); clearErrorOnChange(); }} 
                  placeholder="Your name"
                  aria-invalid={!!error && !name.trim()}
                  aria-describedby={error ? "validation-error" : undefined}
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select value={service} onValueChange={(value) => { setService(value); clearErrorOnChange(); }}>
                  <SelectTrigger 
                    id="service" 
                    aria-label="Select service"
                    aria-invalid={!!error}
                    aria-describedby={error ? "validation-error" : undefined}
                    data-testid="select-service"
                  >
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calendar">Date</Label>
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={(newDate) => { setDate(newDate); clearErrorOnChange(); }}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  id="calendar"
                  aria-label="Select booking date"
                  data-testid="calendar-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select value={time} onValueChange={(value) => { setTime(value); clearErrorOnChange(); }}>
                  <SelectTrigger 
                    id="time" 
                    aria-label="Select time slot"
                    aria-invalid={!!error && !time}
                    aria-describedby={error ? "validation-error" : undefined}
                    data-testid="select-time"
                  >
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                  </SelectContent>
                </Select>
                <Label htmlFor="area" className="mt-4">Area</Label>
                <Select value={area} onValueChange={(value) => { setArea(value); clearErrorOnChange(); }}>
                  <SelectTrigger 
                    id="area" 
                    aria-label="Select service area"
                    aria-invalid={!!error}
                    aria-describedby={error ? "validation-error" : undefined}
                    data-testid="select-area"
                  >
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((a) => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="rounded-md border p-4 bg-muted/50" data-testid="pricing-display">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm">Estimated Cost</h3>
                  <p className="text-xs text-muted-foreground">
                    {service === "Remote Support" ? "Remote session" : "Includes callout fee"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold" data-testid="text-estimated-cost">R{estimatedCost}</span>
                  {service !== "Remote Support" && areaFees[area] > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Base: R{servicePrices[service]} + Travel: R{areaFees[area]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleWhatsAppClick} data-testid="button-whatsapp">
                Confirm via WhatsApp
              </Button>
              <Button variant="outline" onClick={handleEmailClick} data-testid="button-email">
                Email Instead
              </Button>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-md" data-testid="modal-confirmation">
                <DialogHeader>
                  <DialogTitle>Confirm Your Booking</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 text-sm">
                  <p><strong>Name</strong>: {name}</p>
                  <p><strong>Service</strong>: {service}</p>
                  <p><strong>Date & Time</strong>: {date ? date.toDateString() : "(pick date)"} {time}</p>
                  <p><strong>Area</strong>: {area}</p>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Cost:</span>
                      <span className="text-xl font-bold">R{estimatedCost}</span>
                    </div>
                    {service !== "Remote Support" && areaFees[area] > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Base R{servicePrices[service]} + Travel R{areaFees[area]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleConfirmSubmit} data-testid="button-confirm-send">
                    {submitMethod === 'whatsapp' ? 'Send via WhatsApp' : 'Send via Email'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)} data-testid="button-cancel">
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
