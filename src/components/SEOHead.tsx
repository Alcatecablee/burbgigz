import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  structuredData?: object;
  noindex?: boolean;
}

const SEOHead = ({
  title = "BurbGigz IT Services | Remote Support & PC Repairs in Lombardy East, Johannesburg",
  description = "Professional IT support in Lombardy East, Johannesburg. Remote troubleshooting from R120, on-site repairs from R400. Windows reloads, virus removal, SSD upgrades, Wi-Fi setup. Same-day service available.",
  keywords = "IT support Lombardy East, remote IT support Johannesburg, PC repair Bedfordview, laptop repair Edenvale, Windows reload Johannesburg, virus removal Sandton, SSD upgrade Alexandra, Wi-Fi setup Greenstone, printer setup Kempton Park, IT services Marlboro",
  ogTitle = title,
  ogDescription = description,
  ogImage = "/og-image.jpg",
  ogUrl,
  canonicalUrl,
  structuredData,
  noindex = false
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="BurbGigz IT Services" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={typeof window !== 'undefined' ? `${window.location.origin}${ogImage}` : `https://burbgigz.com${ogImage}`} />
      <meta property="og:url" content={ogUrl || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://burbgigz.com')} />
      <meta property="og:site_name" content="BurbGigz IT Services" />
      <meta property="og:locale" content="en_ZA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={typeof window !== 'undefined' ? `${window.location.origin}${ogImage}` : `https://burbgigz.com${ogImage}`} />
      
      {/* Local Business */}
      <meta name="geo.region" content="ZA-GP" />
      <meta name="geo.placename" content="Lombardy East, Johannesburg" />
      <meta name="geo.position" content="-26.1579,28.1549" />
      <meta name="ICBM" content="-26.1579,28.1549" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://burbgigz.com')} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;