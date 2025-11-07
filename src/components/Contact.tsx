import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Smartphone 
} from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-2">Let's Get Started</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Need Help? WhatsApp Me - I Usually Respond Within Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            WhatsApp is quickest (I'm on it all day), but you can also call or email. Remote fixes done same-day. For on-site work in Johannesburg, I'll come to you (R400 callout + service).
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border shadow-sm transition-all duration-300 group hover:shadow-md hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 rounded-full bg-success/10 group-hover:bg-success transition-all duration-300 group-hover:scale-110 w-fit">
                <MessageCircle className="h-6 w-6 text-success group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <CardTitle>WhatsApp (Fastest)</CardTitle>
              <CardDescription>I'm on WhatsApp all day - usually respond in 5-15 minutes</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild
                className="w-full bg-success hover:bg-success/90 text-white transition-all duration-200 hover:scale-105 active:scale-95 focus-ring-enhanced"
                size="lg"
              >
                <a 
                  href="https://wa.me/27670494876" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Contact us via WhatsApp at 067 049 4876"
                >
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Start Remote Support
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border shadow-sm transition-all duration-300 group hover:shadow-md hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 rounded-full bg-primary/10 group-hover:bg-primary transition-all duration-300 group-hover:scale-110 w-fit">
                <Phone className="h-6 w-6 text-primary group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <CardTitle>Phone Call</CardTitle>
              <CardDescription>Call if it's urgent or you prefer talking things through</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild
                variant="outline"
                className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 active:scale-95 focus-ring-enhanced"
                size="lg"
              >
                <a 
                  href="tel:+27670494876"
                  aria-label="Call us at 067 049 4876"
                >
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  Call Now
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border shadow-sm transition-all duration-300 group md:col-span-2 lg:col-span-1 hover:shadow-md hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 rounded-full bg-warning/10 group-hover:bg-warning transition-all duration-300 group-hover:scale-110 w-fit">
                <Mail className="h-6 w-6 text-warning group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>For detailed info or quotes - I'll reply same day</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild
                variant="outline" 
                className="w-full hover:bg-warning hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 focus-ring-enhanced"
                size="lg"
              >
                <a 
                  href="mailto:support@burbgigz.com"
                  aria-label="Send us an email at support@burbgigz.com"
                >
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Send Email
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Service Areas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Lombardy East (Main Area)</span>
                <Badge variant="default">Primary</Badge>
              </div>
              <div className="border-t pt-2 space-y-2 text-muted-foreground">
                <div className="flex justify-between"><span>Alexandra</span><span className="text-xs">NW • ~3 km</span></div>
                <div className="flex justify-between"><span>Lakeside</span><span className="text-xs">NE • ~3 km</span></div>
                <div className="flex justify-between"><span>Kew</span><span className="text-xs">Adjacent</span></div>
                <div className="flex justify-between"><span>Marlboro (Gautrain)</span><span className="text-xs">N • ~4 km</span></div>
                <div className="flex justify-between"><span>Greenstone Mall</span><span className="text-xs">E • ~10 min</span></div>
                <div className="flex justify-between"><span>Sandton</span><span className="text-xs">NW • ~6–8 km</span></div>
                <div className="flex justify-between"><span>Johannesburg CBD</span><span className="text-xs">W • ~14 km</span></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Operating Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday</span>
                  <span className="font-medium">Open 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Tuesday</span>
                  <span className="font-medium">Open 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Wednesday</span>
                  <span className="font-medium">Open 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Thursday</span>
                  <span className="font-medium">Open 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span className="font-medium">8:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-muted-foreground">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-muted-foreground">Closed</span>
                </div>
              </div>
              <div className="border-t pt-2">
                <div className="flex items-center space-x-2 text-success">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm">24/7 WhatsApp Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
