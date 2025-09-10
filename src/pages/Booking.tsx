import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useMemo, useState } from "react";

const timeSlots = ["09:00", "11:00", "14:00", "16:00"];
const services = ["Remote Support", "On‑Site Callout", "SSD Upgrade", "Wi‑Fi/Printer Setup"];
const areas = ["Lombardy East", "Alexandra", "Lakeside", "Kew", "Marlboro", "Greenstone", "Sandton", "Johannesburg CBD"];

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [service, setService] = useState(services[0]);
  const [area, setArea] = useState(areas[0]);
  const [name, setName] = useState("");

  const text = useMemo(() => {
    return `Booking request:\nName: ${name || "(your name)"}\nService: ${service}\nDate: ${date ? date.toDateString() : "(pick date)"} ${time}\nArea: ${area}`;
  }, [name, service, date, time, area]);

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
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label>Service</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                  </SelectContent>
                </Select>
                <Label className="mt-4">Area</Label>
                <Select value={area} onValueChange={setArea}>
                  <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                  <SelectContent>
                    {areas.map((a) => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button asChild>
                <a href={`https://wa.me/27670494876?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer">Confirm via WhatsApp</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`mailto:clive@dealeeoo.com?subject=${encodeURIComponent("Booking request")}&body=${encodeURIComponent(text)}`}>Email Instead</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
