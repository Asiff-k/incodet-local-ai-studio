// Single source of truth for brand and contact details. Never hardcode these elsewhere.
export const site = {
  name: "Incodet",
  logoUrl: "",
  email: "hello@incodet.com",
  phoneDisplay: "+61 451 526 342",
  phoneHref: "tel:+61451526342",
  whatsapp:
    "https://wa.me/61451526342?text=Hi%20Incodet%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  address: "Camberwarra Drive, Craigie WA 6025, Australia",
  locationLabel: "Perth, Western Australia",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Camberwarra+Drive+Craigie+WA+6025+Australia",
  socials: {
    linkedin: "https://www.linkedin.com/company/incodet/",
    facebook: "",
    instagram: "",
    tiktok: "",
  },
  // Pexels clip 33227529 (free license), self-hosted and re-encoded.
  heroVideo: { src: "/videos/hero.mp4", poster: "/videos/hero-poster.webp" },
} as const;

export type SocialKey = keyof typeof site.socials;

export const socialLabels: Record<SocialKey, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

/** Only socials with a non-empty URL. */
export const activeSocials = (Object.keys(site.socials) as SocialKey[])
  .filter((k) => site.socials[k])
  .map((k) => ({ key: k, label: socialLabels[k], href: site.socials[k] }));

export const pageLinks = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/custom-software", label: "Custom Software" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/book", label: "Book a Call" },
  { to: "/portal", label: "Client Portal" },
] as const;

export const industryLinks = [
  { to: "/industries/roofing", label: "Roofing" },
  { to: "/industries/epoxy-flooring", label: "Epoxy Flooring" },
  { to: "/industries/salons", label: "Salons" },
  { to: "/industries/barber-shops", label: "Barber Shops" },
] as const;
