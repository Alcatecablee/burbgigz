import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Service areas with pricing aligned to Pricing.tsx and Booking.tsx
const areas = [
  { name: "Lombardy East", desc: "Primary service area and base.", calloutFee: 400, distanceKm: 0, availability: "Same-day callouts available." },
  { name: "Alexandra", desc: "~3 km NW. Fast access for remote prep, callouts on request.", calloutFee: 450, distanceKm: 3, availability: "Next-day callouts." },
  { name: "Lakeside", desc: "~3 km NE. Quick home/office support.", calloutFee: 450, distanceKm: 3, availability: "Next-day callouts." },
  { name: "Kew", desc: "Adjacent. Rapid onsite availability.", calloutFee: 450, distanceKm: 1, availability: "Same-day callouts." },
  { name: "Marlboro (Gautrain)", desc: "~4 km N. Convenient transport hub.", calloutFee: 470, distanceKm: 4, availability: "Next-day callouts." },
  { name: "Greenstone Mall", desc: "~10 min E. Popular retail/office zone.", calloutFee: 490, distanceKm: 6, availability: "Next-day callouts." },
  { name: "Sandton", desc: "~6–8 km NW. Business hub; after‑hours remote preferred.", calloutFee: 520, distanceKm: 7, availability: "Scheduled callouts." },
  { name: "Johannesburg CBD", desc: "~14 km W. Planned callouts; remote first.", calloutFee: 550, distanceKm: 14, availability: "Scheduled callouts." },
  { name: "Bedfordview", desc: "~5 km SE. Residential and business support.", calloutFee: 500, distanceKm: 5, availability: "Next-day callouts." },
  { name: "Edenvale", desc: "~5 km E. Quick access for homes/offices.", calloutFee: 490, distanceKm: 5, availability: "Next-day callouts." },
  { name: "Kempton Park", desc: "~15 km NE. Airport-adjacent business support.", calloutFee: 560, distanceKm: 15, availability: "Scheduled callouts." },
];

const Areas = () => {
  const [sortBy, setSortBy] = useState("name");

  // SEO optimization
  useEffect(() => {
    document.title = "IT Support Service Areas | Lombardy East & Johannesburg";
    
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta(
      "description",
      "IT support services in Lombardy East, Alexandra, Sandton, and more. Remote support from R150, on-site from R400. Book now!"
    );
    setMeta(
      "keywords",
      "IT support Lombardy East, Johannesburg tech support, Sandton IT services, remote support areas"
    );
    // Fix OG tags to use property instead of name
    const setOGMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setOGMeta("og:title", "IT Support Service Areas in Lombardy East");
    setOGMeta("og:description", "Remote and on-site IT support in Lombardy East, Sandton, Alexandra, and more. Starting at R150!");
    setOGMeta("og:url", window.location.origin + "/areas");
    setOGMeta("og:type", "website");
    setOGMeta("og:image", window.location.origin + "/og-image.jpg");

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.origin + "/areas";
  }, []);

  // Sorting functionality
  const sortedAreas = [...areas].sort((a, b) => {
    if (sortBy === "fee") return a.calloutFee - b.calloutFee;
    if (sortBy === "distance") return a.distanceKm - b.distanceKm;
    return a.name.localeCompare(b.name);
  });

  const handleBookingClick = (area: string, type: 'onsite' | 'remote') => {
    // Analytics tracking can be added here in the future
    console.log(`Booking click: ${area} - ${type}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-12">
        <div className="text-center space-y-3 mb-8">
          <Badge variant="outline">Service Areas</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Lombardy East & Surrounding Suburbs</h1>
          <p className="text-muted-foreground">Remote support available for all areas from R150. On‑site callouts from R400.</p>
        </div>

        {/* Sorting Controls */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {sortedAreas.length} service areas
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="fee">Sort by Callout Fee</SelectItem>
              <SelectItem value="distance">Sort by Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAreas.map((a) => (
            <Card 
              key={a.name} 
              className="bg-card border hover:shadow-md transition-shadow"
              role="region"
              aria-labelledby={`area-${a.name.replace(/\s+/g, '-').toLowerCase()}`}
              data-testid={`card-area-${a.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <CardHeader>
                <CardTitle id={`area-${a.name.replace(/\s+/g, '-').toLowerCase()}`}>{a.name}</CardTitle>
                <CardDescription>{a.desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Pricing Information */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">On-site callout:</span>
                    <span className="font-semibold" data-testid={`text-callout-fee-${a.name.replace(/\s+/g, '-').toLowerCase()}`}>R{a.calloutFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Remote support:</span>
                    <span className="font-semibold text-green-600" data-testid={`text-remote-fee-${a.name.replace(/\s+/g, '-').toLowerCase()}`}>R150</span>
                  </div>
                </div>
                
                {/* Availability */}
                <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded" data-testid={`text-availability-${a.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  {a.availability}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    asChild 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    data-testid={`button-book-onsite-${a.name.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <Link
                      to="/booking"
                      onClick={() => handleBookingClick(a.name, 'onsite')}
                      aria-label={`Book on-site visit for ${a.name}`}
                    >
                      Book On-site
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    data-testid={`button-book-remote-${a.name.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <Link
                      to="/remote"
                      onClick={() => handleBookingClick(a.name, 'remote')}
                      aria-label={`Book remote support for ${a.name}`}
                    >
                      Book Remote
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Our Service Coverage</h2>
          <p className="text-center text-muted-foreground mb-6">
            Visual map showing our primary service areas around Lombardy East, Johannesburg
          </p>
          <div className="relative w-full h-96 rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57318.89258788324!2d28.083885!3d-26.103014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950dcb8d36b29f%3A0xf5ed8e5e8d4d4e8e!2sLombardy%20East%2C%20Johannesburg!5e0!3m2!1sen!2sza!4v1696941234567!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service areas map centered on Lombardy East, Johannesburg"
              data-testid="map-service-areas"
            ></iframe>
          </div>
        </div>
      </div>
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "IT Support",
            provider: {
              "@type": "LocalBusiness",
              name: "BurbGigz IT Services",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lombardy East, Johannesburg",
                addressRegion: "Gauteng",
                addressCountry: "ZA",
              },
              telephone: "+27670494876",
            },
            areaServed: areas.map((a) => ({
              "@type": "City",
              name: a.name.split(" (")[0], // Clean up names for schema
            })),
            offers: [
              {
                "@type": "Offer",
                priceCurrency: "ZAR",
                price: "150",
                description: "Remote IT support starting at R150",
              },
              {
                "@type": "Offer",
                priceCurrency: "ZAR",
                price: "400",
                description: "On-site IT support callout starting at R400",
              },
            ],
          }),
        }}
      />
      
      <Footer />
    </div>
  );
};

export default Areas;
