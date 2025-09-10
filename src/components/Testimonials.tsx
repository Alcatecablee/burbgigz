import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  { name: "R. Mokoena (Lombardy East)", text: "Remote session sorted my printer and Wi‑Fi in 30 minutes. Professional and fast." },
  { name: "S. Naidoo (Greenstone)", text: "SSD upgrade and Windows reinstall made my laptop feel new. Clear pricing and great comms." },
  { name: "J. Smith (Sandton)", text: "Phone troubleshooting first, then a quick callout. Efficient and trustworthy." },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline">Testimonials</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">What Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-card border">
              <CardHeader>
                <CardTitle className="text-base">{t.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{t.text}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
