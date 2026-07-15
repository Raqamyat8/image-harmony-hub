import { IMG, STOCK } from "@/assets/images";

export type Property = {
  id: string;
  title: string;
  address: string;
  city: string;
  neighborhood: string;
  type: "Penthouse" | "Villa" | "Residence" | "Loft" | "Waterfront" | "Historic" | "Commercial";
  listing: "Sale" | "Rent";
  price: number;
  priceUnit?: "mo";
  beds: number;
  baths: number;
  sqft: number;
  year: number;
  parking: boolean;
  pool: boolean;
  garden: boolean;
  furnished: boolean;
  featured?: boolean;
  images: string[];
  description: string;
  amenities: string[];
  agentId: string;
  coords: { x: number; y: number }; // 0-100 for mock map
};

export const properties: Property[] = [
  {
    id: "meridian-tower-42",
    title: "Meridian Tower — Sky Residence 42",
    address: "1 Meridian Avenue, Floor 42",
    city: "New York",
    neighborhood: "Hudson Yards",
    type: "Penthouse",
    listing: "Sale",
    price: 8_450_000,
    beds: 4, baths: 4, sqft: 4820, year: 2024,
    parking: true, pool: true, garden: false, furnished: true, featured: true,
    images: [IMG.tower, IMG.interior, IMG.terrace, STOCK.penthouse1, STOCK.interior2],
    description:
      "A rare corner residence atop the Meridian Tower, wrapped in floor-to-ceiling glass with unbroken views of the river and skyline. Interiors are finished in book-matched travertine, oak, and hand-polished brass. A private elevator opens directly into a formal foyer.",
    amenities: ["Private elevator", "24hr concierge", "Wine cellar", "Spa & sauna", "Screening room", "Rooftop pool", "Valet parking", "Pet spa", "Golf simulator", "Library lounge", "Fitness center", "EV charging"],
    agentId: "sofia-marín",
    coords: { x: 62, y: 38 },
  },
  {
    id: "atelier-loft-soho",
    title: "The Atelier — Signature Loft",
    address: "88 Greene Street",
    city: "New York",
    neighborhood: "SoHo",
    type: "Loft",
    listing: "Sale",
    price: 4_200_000,
    beds: 3, baths: 3, sqft: 2960, year: 2019,
    parking: false, pool: false, garden: true, furnished: true, featured: true,
    images: [IMG.interior, IMG.terrace, STOCK.loft1, STOCK.loft2, STOCK.interior3],
    description:
      "A full-floor cast-iron loft reimagined for modern living. Original columns, refinished herringbone floors, and a chef's kitchen anchored by a single slab of Calacatta marble.",
    amenities: ["Concierge", "Private garden", "Chef's kitchen", "Fireplace", "Smart home", "Storage", "Wine fridge", "Steam shower"],
    agentId: "sofia-marín",
    coords: { x: 40, y: 55 },
  },
  {
    id: "azure-terrace-penthouse",
    title: "Azure Terrace Penthouse",
    address: "220 Riverside Boulevard",
    city: "New York",
    neighborhood: "Tribeca",
    type: "Penthouse",
    listing: "Sale",
    price: 12_900_000,
    beds: 5, baths: 5, sqft: 6100, year: 2023,
    parking: true, pool: true, garden: true, furnished: false, featured: true,
    images: [IMG.terrace, IMG.tower, IMG.interior, STOCK.penthouse2, STOCK.villa2],
    description:
      "A duplex penthouse with a private 2,400 sqft terrace, outdoor kitchen, and infinity spa overlooking downtown. Curated finishes by Studio Sofield.",
    amenities: ["Rooftop terrace", "Outdoor kitchen", "Infinity spa", "Private elevator", "Home theater", "Wine cellar", "Gym", "Guest suite", "Fireplace", "Smart lighting"],
    agentId: "sofia-marín",
    coords: { x: 55, y: 46 },
  },
  {
    id: "coastline-villa",
    title: "Coastline Villa",
    address: "12 Ocean Ridge",
    city: "Malibu",
    neighborhood: "Point Dume",
    type: "Villa",
    listing: "Sale",
    price: 15_400_000,
    beds: 6, baths: 7, sqft: 8200, year: 2022,
    parking: true, pool: true, garden: true, furnished: false,
    images: [STOCK.villa1, STOCK.waterfront1, STOCK.villa3, STOCK.interior2],
    description: "A cliff-set contemporary villa opening entirely to the Pacific through sliding glass walls.",
    amenities: ["Infinity pool", "Private beach access", "Home theater", "Wine cellar", "Guest house", "Gym"],
    agentId: "julian-arenas",
    coords: { x: 20, y: 58 },
  },
  {
    id: "harbour-residence",
    title: "Harbour Residence 07",
    address: "700 Harbour Street",
    city: "Miami",
    neighborhood: "Fisher Island",
    type: "Waterfront",
    listing: "Sale",
    price: 6_800_000,
    beds: 4, baths: 5, sqft: 4500, year: 2021,
    parking: true, pool: true, garden: false, furnished: true,
    images: [STOCK.waterfront2, STOCK.waterfront1, STOCK.penthouse1],
    description: "Direct-water residence with a private slip, wraparound terrace, and unobstructed bay views.",
    amenities: ["Private dock", "Concierge", "Pool", "Beach club", "Gym", "Spa"],
    agentId: "elena-varga",
    coords: { x: 45, y: 78 },
  },
  {
    id: "highline-loft",
    title: "Highline Loft",
    address: "512 W 24th Street",
    city: "New York",
    neighborhood: "Chelsea",
    type: "Loft",
    listing: "Rent",
    price: 24_500, priceUnit: "mo",
    beds: 2, baths: 2, sqft: 2100, year: 2018,
    parking: false, pool: false, garden: true, furnished: true,
    images: [STOCK.loft2, STOCK.interior3, IMG.interior],
    description: "A design-forward loft steps from the High Line, curated by a private art collector.",
    amenities: ["Concierge", "Roof deck", "Fitness", "Storage"],
    agentId: "marcus-hale",
    coords: { x: 42, y: 40 },
  },
  {
    id: "belvedere-villa",
    title: "Belvedere Hillside Villa",
    address: "44 Belvedere Lane",
    city: "Los Angeles",
    neighborhood: "Bel Air",
    type: "Villa",
    listing: "Sale",
    price: 22_500_000,
    beds: 7, baths: 9, sqft: 12400, year: 2024,
    parking: true, pool: true, garden: true, furnished: false,
    images: [STOCK.villa2, STOCK.villa1, STOCK.penthouse2],
    description: "A hilltop estate with 270° views, tennis pavilion, and 2-acre gardens.",
    amenities: ["Tennis court", "Infinity pool", "Wellness spa", "Wine cellar", "Motor court", "Staff quarters"],
    agentId: "julian-arenas",
    coords: { x: 18, y: 62 },
  },
  {
    id: "prospero-townhouse",
    title: "Prospero Townhouse",
    address: "9 Beacon Row",
    city: "Boston",
    neighborhood: "Beacon Hill",
    type: "Historic",
    listing: "Sale",
    price: 5_950_000,
    beds: 5, baths: 4, sqft: 4400, year: 1856,
    parking: true, pool: false, garden: true, furnished: false,
    images: [STOCK.historic1, STOCK.interior2, IMG.interior],
    description: "A landmarked 19th-century townhouse restored with contemporary systems and finishes.",
    amenities: ["Private garden", "Fireplaces", "Wine room", "Guest suite"],
    agentId: "elena-varga",
    coords: { x: 68, y: 30 },
  },
  {
    id: "north-cape-office",
    title: "North Cape — Signature Office",
    address: "1 North Cape Plaza",
    city: "San Francisco",
    neighborhood: "Financial District",
    type: "Commercial",
    listing: "Rent",
    price: 88_000, priceUnit: "mo",
    beds: 0, baths: 6, sqft: 14200, year: 2020,
    parking: true, pool: false, garden: false, furnished: false,
    images: [STOCK.commercial1, STOCK.interior3],
    description: "A full-floor corner office with skyline views and private terrace.",
    amenities: ["Private terrace", "Conference suite", "Concierge", "EV parking"],
    agentId: "marcus-hale",
    coords: { x: 15, y: 45 },
  },
  {
    id: "solstice-residence",
    title: "Solstice Residence",
    address: "300 Park Point",
    city: "New York",
    neighborhood: "Upper East Side",
    type: "Residence",
    listing: "Sale",
    price: 3_400_000,
    beds: 3, baths: 3, sqft: 2200, year: 2017,
    parking: false, pool: true, garden: false, furnished: true,
    images: [STOCK.interior2, IMG.interior, STOCK.penthouse1],
    description: "A serene park-facing residence with double exposures and a private study.",
    amenities: ["Concierge", "Pool", "Gym", "Roof deck", "Children's playroom"],
    agentId: "sofia-marín",
    coords: { x: 58, y: 34 },
  },
  {
    id: "cinq-terraces",
    title: "Cinq Terraces",
    address: "5 Rue de la Lumière",
    city: "Paris",
    neighborhood: "8ᵉ",
    type: "Residence",
    listing: "Sale",
    price: 7_100_000,
    beds: 3, baths: 3, sqft: 2600, year: 1902,
    parking: true, pool: false, garden: true, furnished: true,
    images: [STOCK.historic1, STOCK.interior3, STOCK.interior2],
    description: "Haussmannien classic with five terraces overlooking the Champs-Élysées.",
    amenities: ["Concierge", "Wine cellar", "Fireplaces", "Original moldings"],
    agentId: "elena-varga",
    coords: { x: 82, y: 32 },
  },
  {
    id: "aegis-terrace",
    title: "Aegis Sky Terrace",
    address: "1200 Aegis Drive",
    city: "Chicago",
    neighborhood: "Streeterville",
    type: "Penthouse",
    listing: "Sale",
    price: 5_250_000,
    beds: 4, baths: 4, sqft: 3800, year: 2022,
    parking: true, pool: true, garden: true, furnished: false,
    images: [IMG.terrace, STOCK.penthouse2, IMG.tower],
    description: "A crown-of-the-tower residence with a landscaped sky terrace above Lake Michigan.",
    amenities: ["Sky terrace", "Concierge", "Pool", "Spa", "Fitness", "Wine storage"],
    agentId: "julian-arenas",
    coords: { x: 48, y: 28 },
  },
];

export const featuredProperties = properties.filter((p) => p.featured);

export const cities = Array.from(new Set(properties.map((p) => p.city))).sort();
export const propertyTypes = ["Penthouse", "Villa", "Residence", "Loft", "Waterfront", "Historic", "Commercial"] as const;

export function getProperty(id: string) {
  return properties.find((p) => p.id === id);
}

export function formatPrice(p: Pick<Property, "price" | "priceUnit">) {
  const n = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(p.price);
  return p.priceUnit === "mo" ? `${n}/mo` : n;
}
