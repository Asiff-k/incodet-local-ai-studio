/**
 * Temporary images that fill empty image slots until real work is available.
 * Files live in public/images/temp as "<id>-<width>.webp". Sources, licences and what to
 * replace each one with are listed in docs/temp-images.md. Remove an entry (and its
 * `temp` reference in src/content/services.ts) once the real image is in place.
 */
export type TempImage = { widths: number[]; alt: string };

const tile = [300, 600];
const wide = [640, 1280];
const comparison = [700, 1300, 2432];

export const tempImages = {
  "calling-phone-desk": {
    widths: tile,
    alt: "Smartphone on a stand beside a notepad on a wooden desk",
  },
  "chatbot-bloom-assistant": {
    widths: tile,
    alt: "Bloom Studio website chat assistant suggesting common questions",
  },
  "app-wireframe-paper": {
    widths: tile,
    alt: "Hand-drawn app and website wireframes on paper with an orange pen",
  },
  "app-wireframe-paper-wide": {
    widths: wide,
    alt: "Hand-drawn app and website wireframes on paper with an orange pen",
  },
  "app-wireframe-blue": {
    widths: tile,
    alt: "Hand-drawn wireframe sketches on a dark blue background",
  },
  "uiux-humandata-mobile": {
    widths: tile,
    alt: "HumanData Labs website shown on a phone screen",
  },
  "software-portal-demo": {
    widths: tile,
    alt: "Incodet client portal demo showing project progress for a sample client",
  },
  "software-brhex-floorplan": {
    widths: tile,
    alt: "BRHEX Studio floor plan viewer showing a ground floor layout",
  },
  "social-studio-lights": {
    widths: tile,
    alt: "Small content studio with lights, stands and paper backdrops",
  },
  "social-studio-lights-wide": {
    widths: wide,
    alt: "Small content studio with lights, stands and paper backdrops",
  },
  "social-planning-flatlay": {
    widths: tile,
    alt: "Pens, markers and paper clips on a white desk for content planning",
  },
  "webdev-bloom-before": {
    widths: comparison,
    alt: "Grey-box wireframe of the Bloom Studio homepage",
  },
  "webdev-bloom-after": {
    widths: comparison,
    alt: "Finished Bloom Studio homepage with booking and salon assistant buttons",
  },
  "uiux-bloom-mobile-before": {
    widths: comparison,
    alt: "Grey-box wireframe of the Bloom Studio homepage on a phone",
  },
  "uiux-bloom-mobile-after": {
    widths: comparison,
    alt: "Finished Bloom Studio homepage on a phone",
  },
  "appdev-humandata-mobile-before": {
    widths: comparison,
    alt: "Grey-box wireframe of the HumanData Labs homepage on a phone",
  },
  "appdev-humandata-mobile-after": {
    widths: comparison,
    alt: "Finished HumanData Labs homepage on a phone",
  },
} satisfies Record<string, TempImage>;

export type TempImageId = keyof typeof tempImages;

export const tempImageSrc = (id: TempImageId, width: number) => `/images/temp/${id}-${width}.webp`;
