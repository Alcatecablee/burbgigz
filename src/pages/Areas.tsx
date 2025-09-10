import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const areas = [
  { name: "Lombardy East", desc: "Primary service area and base." },
  { name: "Alexandra", desc: "~3 km NW. Fast access for remote prep, callouts on request." },
  { name: "Lakeside", desc: "~3 km NE. Quick home/office support." },
  { name: "Kew", desc: "Adjacent. Rapid onsite availability." },
  { name: "Marlboro (Gautrain)", desc: "~4 km N. Convenient transport hub." },
  { name: "Greenstone Mall", desc: "~10 min E. Popular retail/office zone." },
  { name: "Sandton", desc: "~6–8 km NW. Business hub; after‑hours remote preferred." },
  { name: "Johannesburg CBD", desc: "~14 km W. Planned callouts; remote first." },
];

const Areas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-12">
        <div className="text-center space-y-3 mb-8">
          <Badge variant="outline">Service Areas</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Lombardy East & Surrounding Suburbs</h1>
          <p className="text-muted-foreground">Remote first across Johannesburg. On‑site callouts scheduled for listed areas.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((a) => (
            <Card key={a.name} className="bg-card border">
              <CardHeader>
                <CardTitle>{a.name}</CardTitle>
                <CardDescription>{a.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="/booking" className="text-primary hover:underline">Book a visit</a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Areas;
