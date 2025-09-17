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
  { value: "fixed", label: "Fixed Callout Fee (I cover transport)", description: "R400 base + distance add-on (predictable pricing)." },
  { value: "my_account", label: "I Use My Uber/Bolt (Pass-through fare)", description: "R400 base + actual Uber/Bolt estimate (no markup; covers my travel)." },
  { value: "client_account", label: "You Use Your Uber/Bolt Account", description: "R400 base only—apply your discounts (e.g., Uber 20% off or Bolt R75 promo); I'll meet you there." },
];