import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  MapPin, 
  Calendar,
  Star,
  CheckCircle2 
} from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-4">About BurbGigz</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Your Local IT Expert Since 2010
              </h2>
              <p className="text-lg text-muted-foreground">
                I've been helping Johannesburg residents solve their computer problems for over a decade. 
                Starting with Gumtree and OLX advertising, I built a reputation for reliable, honest service 
                in the community.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">Local & Trustworthy</h3>
                  <p className="text-muted-foreground">Based in Lombardy East, serving the eastern suburbs with personal, reliable service.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">Experienced Professional</h3>
                  <p className="text-muted-foreground">10+ years of experience with all major computer brands and operating systems.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">Fair Pricing</h3>
                  <p className="text-muted-foreground">Transparent, competitive rates with no hidden fees. You know the cost upfront.</p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Get Your Free Quote Today
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">30 Day</div>
                <div className="text-sm text-muted-foreground">Warranty</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;