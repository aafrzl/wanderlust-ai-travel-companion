import {
  Castle,
  Contact,
  Heart,
  MapPinned,
  MoonStar,
  Palette,
  PersonStanding,
  Sailboat,
  ShoppingBag,
  Users2,
} from "lucide-react";

export const links = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
];

export const budgetList = [
  {
    id: "low",
    label: "Low",
    value: "low",
    description: "Budget Around 0-3,000,000 (IDR)",
  },
  {
    id: "medium",
    label: "Medium",
    value: "medium",
    description: "Budget Around 3,000,000-5,000,000 (IDR)",
  },
  {
    id: "high",
    label: "High",
    value: "high",
    description: "Budget Around 5,000,000+ (IDR)",
  },
  {
    id: "custom",
    label: "Custom",
    value: "custom",
    description: "Custom budget what you want in (IDR)",
  },
];

export const ACTIVITY_PREFERENCES = [
  { id: "sightseeing", displayName: "Sightseeing", icon: MapPinned },
  { id: "adventure", displayName: "Adventure", icon: Sailboat },
  {
    id: "culturalexperiences",
    displayName: "Cultural Experiences",
    icon: Palette,
  },
  { id: "historical", displayName: "Historical", icon: Castle },
  { id: "relaxationwellness", displayName: "Relaxation", icon: PersonStanding },
  { id: "shopping", displayName: "Shopping", icon: ShoppingBag },
  { id: "nightlife", displayName: "Nightlife", icon: MoonStar },
];

export const COMPANION_PREFERENCES = [
  { id: "solo", displayName: "Solo", icon: MapPinned },
  { id: "couple", displayName: "Couple", icon: Heart },
  { id: "family", displayName: "Family", icon: Users2 },
  { id: "group", displayName: "Group", icon: Contact },
];
