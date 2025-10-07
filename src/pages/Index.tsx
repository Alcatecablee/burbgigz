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
        title="BurbGigz IT Services | Remote Support & PC Repairs in Lombardy East, Johannesburg"
        description="Professional IT support in Lombardy East, Johannesburg. Remote troubleshooting from R120, on-site repairs from R400. Windows reloads, virus removal, SSD upgrades, Wi-Fi setup. Same-day service available."
        keywords="IT support Lombardy East, remote IT support Johannesburg, PC repair Bedfordview, laptop repair Edenvale, Windows reload Johannesburg, virus removal Sandton, SSD upgrade Alexandra, Wi-Fi setup Greenstone, printer setup Kempton Park, IT services Marlboro"
        ogTitle="BurbGigz IT Services | Remote Support & PC Repairs in Lombardy East"
        ogDescription="Get professional IT help in Lombardy East, Johannesburg. Remote support from R120, on-site repairs from R400. Fast, secure, and reliable IT services."
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
