import { visible } from "./visible";

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  title?: string;
  description: string;
  tags?: string[];
  demo?: boolean;
  liveUrl?: string;
  /** Drop a WebP at this path in /public; until then a placeholder frame renders. */
  image: { src: string; alt: string; ready: boolean };
  todo?: boolean;
};

const all: CaseStudy[] = [
  {
    slug: "brhex-studio",
    name: "BRHEX Studio",
    category: "Real estate platform",
    title: "A Combined 360° Tour & Auto-Floorplan Platform",
    description:
      "Proof of concept for a white-label real estate media platform: a 360° WebGL tour viewer and an SVG floor plan engine in one, with lead capture and custom branding.",
    tags: ["Next.js", "WebGL", "SVG", "Responsive"],
    liveUrl: "https://virtual-tour-poc.vercel.app/tour/50ad98c9",
    image: { src: "/images/case-studies/brhex-studio.webp", alt: "BRHEX Studio 360° tour platform", ready: false },
  },
  {
    slug: "bloom-studio",
    name: "Bloom Studio",
    category: "Salon website",
    demo: true,
    description:
      "A sample salon website showing how AI concierge features handle bookings and questions for UK salons.",
    liveUrl: "https://bloom.incodet.com",
    image: { src: "/images/case-studies/bloom-studio.webp", alt: "Bloom Studio salon website", ready: false },
  },
  { slug: "incblog", name: "IncBlog", category: "", description: "", image: { src: "/images/case-studies/incblog.webp", alt: "", ready: false }, todo: true },
  { slug: "humandata-labs", name: "HumanData Labs", category: "", description: "", image: { src: "/images/case-studies/humandata-labs.webp", alt: "", ready: false }, todo: true },
  { slug: "incodere", name: "Incodere", category: "", description: "", image: { src: "/images/case-studies/incodere.webp", alt: "", ready: false }, todo: true },
];

export const caseStudies = visible(all, ["name", "category", "description"]);
