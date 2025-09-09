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
                Professional helpdesk technician currently working at GAAP.co.za with extensive remote support experience. 
                I specialize in telephone troubleshooting and use AnyDesk for remote assistance. Most technical issues 
                can be resolved remotely, saving you time and money while providing immediate professional support.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">Remote Support Specialist</h3>
                  <p className="text-muted-foreground">Professional helpdesk experience with AnyDesk remote troubleshooting capabilities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">Professional Background</h3>
                  <p className="text-muted-foreground">Currently employed at GAAP.co.za with strong telephone troubleshooting skills.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">Cost-Effective Solutions</h3>
                  <p className="text-muted-foreground">Remote fixes from R120, on-site service R400 callout + service fee.</p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Start Remote Session
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
                <div className="text-2xl font-bold text-primary">Professional</div>
                <div className="text-sm text-muted-foreground">Helpdesk Experience</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">Remote</div>
                <div className="text-sm text-muted-foreground">Support Specialist</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">AnyDesk</div>
                <div className="text-sm text-muted-foreground">Certified</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">R400</div>
                <div className="text-sm text-muted-foreground">Callout Fee</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;