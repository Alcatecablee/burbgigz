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
          <Badge variant="outline" className="mb-2">Get In Touch</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to Fix Your Tech Issues?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional remote IT support available immediately via secure Remote Support. On-site services
            available in the Lombardy East area (callout fee applies). Quick response guaranteed!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 rounded-full bg-success/10 group-hover:bg-success group-hover:text-white transition-colors w-fit">
                <MessageCircle className="h-6 w-6 text-success group-hover:text-white" />
              </div>
              <CardTitle>WhatsApp (Preferred)</CardTitle>
              <CardDescription>Start remote session or book on-site visit instantly</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                className="w-full bg-success hover:bg-success/90 text-white"
                size="lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Remote Support
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors w-fit">
                <Phone className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <CardTitle>Call Direct</CardTitle>
              <CardDescription>Speak to me directly about your IT needs</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                className="w-full hover:bg-primary hover:text-primary-foreground"
                size="lg"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group md:col-span-2 lg:col-span-1">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 rounded-full bg-warning/10 group-hover:bg-warning group-hover:text-white transition-colors w-fit">
                <Mail className="h-6 w-6 text-warning group-hover:text-white" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>Send detailed information about your issue</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                className="w-full hover:bg-warning hover:text-white"
                size="lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Email
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
              <div className="border-t pt-2 space-y-1 text-muted-foreground">
                <div>• Bedfordview</div>
                <div>• Edenvale</div>
                <div>• Greenstone</div>
                <div>• Kempton Park</div>
                <div>• Benoni (Central)</div>
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
                  <span>Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Emergency Only</span>
                </div>
              </div>
              <div className="border-t pt-2">
                <div className="flex items-center space-x-2 text-success">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm">24/7 WhatsApp Response</span>
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
