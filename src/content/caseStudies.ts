import { visible } from "./visible";

export type CaseStudyInclude = {
  label: string;
  year: string;
  /** Omit for internal tools that must never be linked. */
  url?: string;
  concept?: boolean;
  /** Screenshot path for the Phase 3 gallery. */
  image?: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  title?: string;
  year: string;
  featured?: boolean;
  description: string;
  tags?: string[];
  demo?: boolean;
  liveUrl?: string;
  includes?: CaseStudyInclude[];
  /** Drop a WebP at this path in /public; until then a placeholder frame renders. */
  image: { src: string; alt: string; ready: boolean };
  /** Device mockup built by scripts/mockups (full 1600x1000; a -sm 800x500 sits beside it). */
  mockup?: string;
  challenge?: string;
  solution?: string;
  todo?: boolean;
};

const img = (slug: string) => `/images/case-studies/${slug}.webp`;
const mock = (slug: string) => `/images/mockups/${slug}.webp`;
export const mockupSm = (src: string) => src.replace(/\.webp$/, "-sm.webp");

const all: CaseStudy[] = [
  {
    slug: "western-cars",
    name: "Western Cars",
    category: "Taxi & private hire network",
    title: "Websites and tools for a multi-location taxi company",
    year: "2025 to 2026",
    featured: true,
    description:
      "Location websites for Western Cars across Sussex, a central AI content hub that publishes articles to every location site, and an online staff registration tool.",
    liveUrl: "https://westerncarsbrighton.co.uk/",
    includes: [
      { label: "Brighton website", year: "2026", url: "https://westerncarsbrighton.co.uk/", image: img("western-cars-brighton") },
      { label: "Littlehampton website", year: "2026", url: "https://www.westerncarslittlehampton.co.uk/", image: img("western-cars-littlehampton") },
      { label: "Haywards Heath website", year: "2026", url: "https://www.westerncars-haywardsheath.co.uk/", image: img("western-cars-haywards-heath") },
      { label: "Pulborough website", year: "2026", url: "https://www.westerncarspulborough.co.uk/", image: img("western-cars-pulborough") },
      { label: "Brighton Taxi website", year: "2025", url: "https://brightontaxi.westerncarsbrighton.co.uk/", image: img("brighton-taxi") },
      { label: "AI content hub", year: "2025", url: "https://content.westerncars.com/", image: img("western-cars-content-hub") },
      { label: "Website redesign concept", year: "2026", url: "https://western-cars-website-prototype.vercel.app/", concept: true, image: img("western-cars-prototype") },
      { label: "Staff registration tool", year: "2026", image: img("western-cars-staff-registration") },
    ],
    image: { src: img("western-cars-brighton"), alt: "Homepage of the Western Cars Brighton website", ready: true },
    mockup: mock("western-cars-brighton"),
  },
  {
    slug: "barkers-executive",
    name: "Barkers Executive Cars",
    category: "Executive car service website",
    year: "2026",
    featured: true,
    description:
      "A premium website for an executive car and Gatwick transfer service in Horley, with online booking and corporate travel pages.",
    liveUrl: "https://barkersexecutive.vercel.app/",
    image: { src: img("barkers-executive"), alt: "Homepage of the Barkers Executive Cars website", ready: true },
    mockup: mock("barkers-executive"),
  },
  {
    slug: "gm-taxis-lewes",
    name: "GM Taxis Lewes",
    category: "Taxi company website",
    year: "2026",
    featured: true,
    description:
      "A modern website for a local taxi firm opposite Lewes station, covering airport runs, school runs, executive travel and online booking.",
    liveUrl: "https://gmtaxislewes.co.uk/",
    image: { src: img("gm-taxis-lewes"), alt: "Homepage of the GM Taxis Lewes website", ready: true },
    mockup: mock("gm-taxis-lewes"),
  },
  {
    slug: "humandata-labs",
    name: "HumanData Labs",
    category: "AI data company website",
    year: "2026",
    featured: true,
    description:
      "A website for a company that sources first-person video data for robotics and AI teams, with dataset requests and vendor partner applications.",
    liveUrl: "https://humandatalabs.tech/",
    image: { src: img("humandata-labs"), alt: "Homepage of the HumanData Labs website", ready: true },
    mockup: mock("humandata-labs"),
  },
  {
    slug: "brhex-studio",
    name: "BRHEX Studio",
    category: "Real estate platform",
    title: "A Combined 360° Tour & Auto-Floorplan Platform",
    year: "2026",
    featured: true,
    description:
      "Proof of concept for a white-label real estate media platform: a 360° WebGL tour viewer and an SVG floor plan engine in one, with lead capture and custom branding.",
    tags: ["Next.js", "WebGL", "SVG", "Responsive"],
    challenge:
      "Real estate agents often use one vendor for 360° tours and another for floor plans, each with its own branding. We call it the double vendor trap.",
    solution:
      "One white-label platform with a 360° WebGL tour viewer with hotspots, an SVG floor plan engine with a one-click toggle between the two, lead capture and custom branding.",
    liveUrl: "https://virtual-tour-poc.vercel.app/tour/50ad98c9",
    image: { src: img("brhex-studio"), alt: "360° tour viewer in the BRHEX Studio platform", ready: true },
    mockup: mock("brhex-studio"),
  },
  {
    slug: "bloom-studio",
    name: "Bloom Studio",
    category: "Salon website",
    year: "2026",
    demo: true,
    description:
      "A sample salon website showing how AI concierge features handle bookings and questions for UK salons.",
    liveUrl: "https://bloom.incodet.com",
    image: { src: img("bloom-studio"), alt: "Homepage of the Bloom Studio salon website", ready: true },
    mockup: mock("bloom-studio"),
  },
  {
    slug: "a1-airport-cars",
    name: "A1 Airport Cars Worthing",
    category: "Airport taxi website",
    year: "2025",
    description:
      "A website for a Worthing airport taxi service with flight tracking, 24 hour bookings and minibus options.",
    liveUrl: "https://a1airportcarsworthing.vercel.app/",
    image: { src: img("a1-airport-cars"), alt: "Homepage of the A1 Airport Cars Worthing website", ready: true },
    mockup: mock("a1-airport-cars"),
  },
  { slug: "incblog", name: "IncBlog", category: "", year: "", description: "", image: { src: img("incblog"), alt: "", ready: false }, todo: true },
  { slug: "incodere", name: "Incodere", category: "", year: "", description: "", image: { src: img("incodere"), alt: "", ready: false }, todo: true },
  { slug: "vyra-shops", name: "Vyra Shops", category: "", year: "", description: "", liveUrl: "https://vyrashops.com/", image: { src: img("vyra-shops"), alt: "", ready: false }, todo: true },
];

export const caseStudies = visible(all, ["name", "category", "description"]);
export const featuredCaseStudies = caseStudies.filter((c) => c.featured);

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

/** Homepage "Recent projects" gallery. Littlehampton is part of the Western Cars case study. */
export const recentProjects: { name: string; year: string; mockup: string; caseStudy: string }[] = [
  { name: "Western Cars Brighton", year: "2026", mockup: mock("western-cars-brighton"), caseStudy: "western-cars" },
  { name: "Barkers Executive Cars", year: "2026", mockup: mock("barkers-executive"), caseStudy: "barkers-executive" },
  { name: "GM Taxis Lewes", year: "2026", mockup: mock("gm-taxis-lewes"), caseStudy: "gm-taxis-lewes" },
  { name: "HumanData Labs", year: "2026", mockup: mock("humandata-labs"), caseStudy: "humandata-labs" },
  { name: "BRHEX Studio", year: "2026", mockup: mock("brhex-studio"), caseStudy: "brhex-studio" },
  { name: "Bloom Studio", year: "2026", mockup: mock("bloom-studio"), caseStudy: "bloom-studio" },
  { name: "A1 Airport Cars Worthing", year: "2025", mockup: mock("a1-airport-cars"), caseStudy: "a1-airport-cars" },
  { name: "Western Cars Littlehampton", year: "2026", mockup: mock("western-cars-littlehampton"), caseStudy: "western-cars" },
];
