import { IMG, STOCK } from "@/assets/images";

export type Agent = {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  languages: string[];
  years: number;
  sold: number;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  regions: string[];
};

export const agents: Agent[] = [
  {
    id: "sofia-marín",
    name: "Sofía Marín",
    title: "Managing Director, New York",
    image: IMG.agent,
    bio: "Sofía leads the firm's New York practice, with a fifteen-year record advising founders, principals, and family offices on trophy residences from Tribeca to the Upper East Side.",
    languages: ["English", "Spanish", "Italian"],
    years: 15,
    sold: 312,
    rating: 4.9,
    reviews: 187,
    phone: "+1 (212) 555-0142",
    email: "sofia@luxestate.co",
    regions: ["New York", "Miami"],
  },
  {
    id: "julian-arenas",
    name: "Julian Arenas",
    title: "Partner, West Coast",
    image: STOCK.agent2,
    bio: "Julian specializes in cliff-set and estate residences from Malibu to Bel Air.",
    languages: ["English", "French"],
    years: 12,
    sold: 214,
    rating: 4.8,
    reviews: 129,
    phone: "+1 (310) 555-0188",
    email: "julian@luxestate.co",
    regions: ["Los Angeles", "Malibu"],
  },
  {
    id: "elena-varga",
    name: "Elena Varga",
    title: "International Advisor",
    image: STOCK.agent3,
    bio: "Elena advises international clients across Boston, Paris, and Miami on landmarked and historic properties.",
    languages: ["English", "French", "Hungarian"],
    years: 18,
    sold: 402,
    rating: 5.0,
    reviews: 246,
    phone: "+33 1 55 55 01 42",
    email: "elena@luxestate.co",
    regions: ["Boston", "Paris", "Miami"],
  },
  {
    id: "marcus-hale",
    name: "Marcus Hale",
    title: "Commercial Director",
    image: STOCK.agent4,
    bio: "Marcus leads the firm's commercial and mixed-use practice on both coasts.",
    languages: ["English"],
    years: 10,
    sold: 96,
    rating: 4.9,
    reviews: 74,
    phone: "+1 (415) 555-0177",
    email: "marcus@luxestate.co",
    regions: ["San Francisco", "New York"],
  },
];

export function getAgent(id: string) {
  return agents.find((a) => a.id === id) ?? agents[0];
}
