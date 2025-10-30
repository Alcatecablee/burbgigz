// src/data/transport.ts
export const suburbsTransportEstimates = {
  "Lombardy East": { uber: "R0 (local)", bolt: "R0 (local)", distance: "0 km" },
  "Alexandra (~3 km NW)": { uber: "R80–R120", bolt: "R70–R110", distance: "3 km" },
  "Lakeside (~3 km NE)": { uber: "R80–R120", bolt: "R70–R110", distance: "3 km" },
  "Kew (adjacent)": { uber: "R80–R120", bolt: "R70–R110", distance: "1 km" },
  "Marlboro (Gautrain, ~4 km N)": { uber: "R120–R180", bolt: "R110–R160", distance: "4 km" },
  "Greenstone Mall (~10 min E)": { uber: "R150–R250", bolt: "R140–R220", distance: "8 km" },
  "Sandton (~6–8 km NW)": { uber: "R130–R190", bolt: "R120–R170", distance: "7 km" },
  "Johannesburg CBD (~14 km W)": { uber: "R250–R400", bolt: "R220–R350", distance: "14 km" },
  "Bedfordview (~5 km SE)": { uber: "R120–R180", bolt: "R110–R160", distance: "5 km" },
  "Edenvale (~5 km E)": { uber: "R120–R180", bolt: "R110–R160", distance: "5 km" },
  "Kempton Park (~15 km NE)": { uber: "R300–R450", bolt: "R280–R400", distance: "15 km" },
};

export const transportOptions = [
  { 
    value: "fixed", 
    label: "Fixed Price", 
    icon: "check",
    tagline: "Predictable, no surprises",
    description: "R400 base + distance add-on. You know the exact cost upfront—perfect for budgeting.",
    benefit: "Best for predictability"
  },
  { 
    value: "my_account", 
    label: "Uber/Bolt Quote", 
    icon: "car",
    tagline: "Pay exact fare, no markup",
    description: "R400 base + actual Uber/Bolt estimate. I book the ride and you pay exactly what it costs—transparent pricing.",
    benefit: "Best for transparency"
  },
  { 
    value: "client_account", 
    label: "Use Your Discounts", 
    icon: "gift",
    tagline: "Apply your promos, save money",
    description: "R400 base only. You book the Uber/Bolt using your account and discounts (e.g., Uber 20% off or Bolt R75 promo).",
    benefit: "Best for savings"
  },
];