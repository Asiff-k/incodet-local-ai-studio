// Single source of truth for brand and contact details. Never hardcode these elsewhere.
export const site = {
  name: "Incodet",
  siteUrl: "https://incodet.com",
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
    threads: "",
  },
  // Analytics: provider "plausible" (id = your domain) or "ga4" (id = G-XXXX). Empty = no banner, no scripts.
  analytics: { provider: "" as "" | "plausible" | "ga4", id: "" },
  // Cal.com booking link, format "username/event-slug". Empty shows the "Online booking opens soon" card.
  calLink: "",
  // Pexels clip 10651140 by Kostas Exarhos (free license), cropped, slowed and self-hosted.
  // src720 plays on screens under 768px.
  heroVideo: { src: "/videos/hero.mp4", src720: "/videos/hero-720.mp4", poster: "/videos/hero-poster.webp" },
} as const;

export type SocialKey = keyof typeof site.socials;

export const socialLabels: Record<SocialKey, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  threads: "Threads",
};

/** Every social, set or not; unset ones render as non-clickable "coming soon" icons. */
export const allSocials = (Object.keys(site.socials) as SocialKey[]).map((k) => ({
  key: k,
  label: socialLabels[k],
  href: site.socials[k] as string,
}));

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
