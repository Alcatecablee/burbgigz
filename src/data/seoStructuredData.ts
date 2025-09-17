// Comprehensive structured data for BurbGigz IT Services

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://burbgigz.com/#organization",
  "name": "BurbGigz IT Services",
  "alternateName": "BurbGigz",
  "description": "Professional IT support services in Lombardy East, Johannesburg. Specializing in remote troubleshooting, PC repairs, virus removal, and hardware upgrades.",
  "url": "https://burbgigz.com",
  "telephone": "+27670494876",
  "email": "support@burbgigz.com",
  "foundingDate": "2010",
  "priceRange": "R120-R2000",
  "paymentAccepted": ["Cash", "EFT", "Card"],
  "currenciesAccepted": "ZAR",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lombardy East",
    "addressRegion": "Gauteng",
    "addressCountry": "ZA",
    "postalCode": "2090"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -26.1579,
    "longitude": 28.1549
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Johannesburg",
      "sameAs": "https://en.wikipedia.org/wiki/Johannesburg"
    },
    {
      "@type": "Place",
      "name": "Lombardy East"
    },
    {
      "@type": "Place", 
      "name": "Alexandra"
    },
    {
      "@type": "Place",
      "name": "Sandton"
    },
    {
      "@type": "Place",
      "name": "Bedfordview"
    },
    {
      "@type": "Place",
      "name": "Edenvale"
    },
    {
      "@type": "Place",
      "name": "Kempton Park"
    }
  ],
  "serviceType": [
    "Computer Repair Service",
    "IT Support",
    "Remote Technical Support",
    "Virus Removal",
    "Data Recovery",
    "Network Setup",
    "Hardware Installation"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "IT Support Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Remote IT Support",
          "description": "Professional troubleshooting via secure remote tools"
        },
        "price": "120",
        "priceCurrency": "ZAR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Virus & Malware Removal",
          "description": "Complete system cleanup and protection"
        },
        "price": "150",
        "priceCurrency": "ZAR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Windows Reload & Setup",
          "description": "Complete Windows reinstallation"
        },
        "price": "200",
        "priceCurrency": "ZAR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "On-Site Hardware Service",
          "description": "Physical repairs and upgrades"
        },
        "price": "400",
        "priceCurrency": "ZAR",
        "availability": "https://schema.org/InStock"
      }
    ]
  },
  "openingHours": [
    "Mo-Fr 08:00-18:00",
    "Sa 09:00-15:00"
  ],
  "specialOpeningHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Sunday",
    "opens": "10:00",
    "closes": "16:00",
    "validFrom": "2025-01-01",
    "validThrough": "2025-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sarah Mitchell"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Excellent remote support service! Fixed my slow laptop within 30 minutes. Professional and affordable.",
      "datePublished": "2024-12-15"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person", 
        "name": "John Peters"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Quick SSD upgrade in Lombardy East. Fair pricing and excellent service. Highly recommended!",
      "datePublished": "2024-11-28"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/burbgigz",
    "https://www.linkedin.com/company/burbgigz"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://burbgigz.com/#website",
  "url": "https://burbgigz.com",
  "name": "BurbGigz IT Services",
  "description": "Professional IT support services in Lombardy East, Johannesburg",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://burbgigz.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@id": "https://burbgigz.com/#organization"
  }
};

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const serviceSchema = (service: {
  name: string;
  description: string;
  price: string;
  currency: string;
  provider: string;
  areaServed: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "@id": "https://burbgigz.com/#organization"
  },
  "areaServed": service.areaServed.map(area => ({
    "@type": "Place",
    "name": area
  })),
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": service.name,
    "itemListElement": [{
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": service.currency,
      "availability": "https://schema.org/InStock"
    }]
  }
});

// Google My Business compatible data
export const googleMyBusinessData = {
  business_status: "OPERATIONAL",
  name: "BurbGigz IT Services",
  place_id: "ChIJd7sZZZ5HlR4RQGzLQKzLQKz", // Replace with actual Google Place ID
  types: [
    "computer_repair",
    "electronics_repair_shop", 
    "establishment",
    "point_of_interest"
  ],
  vicinity: "Lombardy East, Johannesburg",
  website: "https://burbgigz.com",
  rating: 4.8,
  user_ratings_total: 127,
  formatted_phone_number: "+27 67 049 4876",
  international_phone_number: "+27 67 049 4876",
  current_opening_hours: {
    open_now: true,
    periods: [
      {
        close: { day: 1, time: "1800" },
        open: { day: 1, time: "0800" }
      },
      {
        close: { day: 2, time: "1800" },
        open: { day: 2, time: "0800" }
      },
      {
        close: { day: 3, time: "1800" },
        open: { day: 3, time: "0800" }
      },
      {
        close: { day: 4, time: "1800" },
        open: { day: 4, time: "0800" }
      },
      {
        close: { day: 5, time: "1800" },
        open: { day: 5, time: "0800" }
      },
      {
        close: { day: 6, time: "1500" },
        open: { day: 6, time: "0900" }
      },
      {
        close: { day: 0, time: "1600" },
        open: { day: 0, time: "1000" }
      }
    ],
    weekday_text: [
      "Monday: 8:00 AM – 6:00 PM",
      "Tuesday: 8:00 AM – 6:00 PM", 
      "Wednesday: 8:00 AM – 6:00 PM",
      "Thursday: 8:00 AM – 6:00 PM",
      "Friday: 8:00 AM – 6:00 PM",
      "Saturday: 9:00 AM – 3:00 PM",
      "Sunday: 10:00 AM – 4:00 PM"
    ]
  }
};