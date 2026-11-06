import { visible } from "./visible";

export type Industry = {
  slug: string;
  name: string;
  to: string;
  icon: "roof" | "floor" | "salon" | "barber";
  todo?: boolean;
};

const all: Industry[] = [
  { slug: "roofing", name: "Roofing", to: "/industries/roofing", icon: "roof" },
  { slug: "epoxy-flooring", name: "Epoxy Flooring", to: "/industries/epoxy-flooring", icon: "floor" },
  { slug: "salons", name: "Salons", to: "/industries/salons", icon: "salon" },
  { slug: "barber-shops", name: "Barber Shops", to: "/industries/barber-shops", icon: "barber" },
];

export const industries = visible(all, ["name", "to"]);
