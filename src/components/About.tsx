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
              <Badge variant="outline" className="mb-4">About Me</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hi, I'm Clive - Fixing Computers in Johannesburg Since 2015
              </h2>
              <p className="text-lg text-muted-foreground">
                I started BurbGigz because I saw too many people getting ripped off by big IT companies charging R800 callouts for simple remote fixes. After 9+ years in corporate helpdesks, I know that most computer problems don't need someone to drive to your house - I can fix them remotely while you watch, usually for R120-R150. For hardware work, I'll come to you with the parts in my car.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">CompTIA Certified (A+ & Network+)</h3>
                  <p className="text-muted-foreground">Got both certifications with distinction. Real qualifications, not just "I'm good with computers."</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">9+ Years Corporate Helpdesk Experience</h3>
                  <p className="text-muted-foreground">Worked in professional IT support for big companies - I've seen it all, from printer jams to server crashes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                <div>
                  <h3 className="font-semibold">Honest Pricing, No Surprises</h3>
                  <p className="text-muted-foreground">Remote from R120, on-site R400 callout. I'll tell you upfront if your laptop's not worth fixing.</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg focus-ring-enhanced"
              asChild
            >
              <a href="/remote" aria-label="Start a remote support session">
                Start Remote Session
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary hover:text-white group">
                    <Calendar className="h-6 w-6 text-primary group-hover:text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">Professional</div>
                <div className="text-sm text-muted-foreground">Helpdesk Experience</div>
              </CardContent>
            </Card>

            <Card className="bg-card border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary hover:text-white group">
                    <Users className="h-6 w-6 text-primary group-hover:text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">Remote</div>
                <div className="text-sm text-muted-foreground">Support Specialist</div>
              </CardContent>
            </Card>

            <Card className="bg-card border shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">Remote</div>
                <div className="text-sm text-muted-foreground">Certified</div>
              </CardContent>
            </Card>

            <Card className="bg-card border shadow-sm">
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
