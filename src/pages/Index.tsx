import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema, websiteSchema } from "@/data/seoStructuredData";

const Index = () => {
  const structuredData = {
    "@graph": [localBusinessSchema, websiteSchema]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Fast, Affordable Remote IT Support Johannesburg | Same-Day Service from R120"
        description="Laptop slow? Printer won't print? We fix it remotely today. Professional IT support in Johannesburg from R120. Same-day service, urgent help available. No callout needed. Serving Lombardy East, Sandton, Bedfordview & all Johannesburg suburbs."
        keywords="fast IT support Johannesburg, affordable remote IT support, urgent IT help Johannesburg, cheap computer repair Johannesburg, same day IT support, weekend IT support, fix laptop remotely South Africa, remote PC repair Johannesburg, affordable computer repair Johannesburg, emergency IT support, after hours IT support Johannesburg, IT support Lombardy East, remote IT support Johannesburg, PC repair Bedfordview, laptop repair Edenvale, virus removal Sandton, SSD upgrade Johannesburg, Wi-Fi setup, printer setup"
        ogTitle="Fast, Affordable Remote IT Support Johannesburg | Same-Day from R120"
        ogDescription="Need urgent IT help? We fix laptops, printers, Wi-Fi remotely – today. Professional remote support from R120, on-site from R400. Fast, secure & affordable."
        structuredData={structuredData}
      />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
