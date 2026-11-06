import { visible } from "./visible";

export type Industry = {
  slug: string;
  name: string;
  to: string;
  icon: "roof" | "floor" | "salon" | "barber";
  page: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    pains: { title: string; body: string }[];
    transcript: { caller: string; ai: string; alert: string };
    /** Case study slug shown under "Related work". */
    relatedWork?: string;
  };
  todo?: boolean;
};

const all: Industry[] = [
  {
    slug: "roofing",
    name: "Roofing",
    to: "/industries/roofing",
    icon: "roof",
    page: {
      title: "AI Receptionist & Websites for Roofing Companies | Incodet",
      description:
        "Booking websites and a 24/7 AI calling agent for roofing companies. Every call answered, every inspection booked, even when you are up on a roof.",
      h1: "Never miss another roofing job",
      intro:
        "Booking websites and a 24/7 AI calling agent for roofing companies. Every call answered, every inspection booked, even when you are up on a roof.",
      pains: [
        { title: "Calls come in while you are on a roof", body: "You cannot answer the phone with a ladder in one hand." },
        { title: "Storm season floods the phone", body: "More calls than you can handle, all on the same day." },
        { title: "Missed calls go to the next roofer", body: "Most callers will not leave a voicemail. They just call someone else." },
      ],
      transcript: {
        caller: "Hi, my roof started leaking after last night's storm. Can someone come and look at it?",
        ai: "Sorry to hear that. I can book a roof inspection for you. What is the property address, and does tomorrow morning or afternoon suit you better?",
        alert: "New inspection booked: roof leak, tomorrow morning.",
      },
    },
  },
  {
    slug: "epoxy-flooring",
    name: "Epoxy Flooring",
    to: "/industries/epoxy-flooring",
    icon: "floor",
    page: {
      title: "AI Receptionist & Websites for Epoxy Flooring Companies | Incodet",
      description:
        "Booking websites and a 24/7 AI calling agent for epoxy flooring companies. The agent collects the job details and books the site visit while you are on a job.",
      h1: "Turn every enquiry into a booked quote",
      intro:
        "Booking websites and a 24/7 AI calling agent for epoxy flooring companies. The agent collects the job details and books the site visit while you are on a job.",
      pains: [
        { title: "You are mid-pour when the phone rings", body: "Coatings do not wait, so calls get missed." },
        { title: "Quotes need details first", body: "Floor size, current surface and timing, every single time." },
        { title: "Leads go cold fast", body: "If nobody replies the same day, the customer moves on." },
      ],
      transcript: {
        caller: "Hi, I would like a quote for an epoxy garage floor.",
        ai: "Happy to help. Roughly how big is the garage, and is the floor bare concrete or already coated? I can then book a free site visit.",
        alert: "New site visit booked: garage floor quote.",
      },
    },
  },
  {
    slug: "salons",
    name: "Salons",
    to: "/industries/salons",
    icon: "salon",
    page: {
      title: "AI Receptionist & Booking Websites for Salons | Incodet",
      description:
        "Booking websites, an AI chatbot and a 24/7 AI calling agent for salons. Clients book any time and you stay focused on the person in your chair.",
      h1: "Bookings that run while you work",
      intro:
        "Booking websites, an AI chatbot and a 24/7 AI calling agent for salons. Clients book any time and you stay focused on the person in your chair.",
      pains: [
        { title: "The phone rings mid-appointment", body: "Stopping to answer means keeping a client waiting." },
        { title: "Clients want to book at 10pm", body: "If they cannot book late at night, they book somewhere else." },
        { title: "Gaps in the diary cost money", body: "Missed calls mean empty slots you could have filled." },
      ],
      transcript: {
        caller: "Hi, can I book a cut and colour this Saturday?",
        ai: "Of course. I have 11:00 or 14:30 available on Saturday. Which would you like?",
        alert: "New booking: cut and colour, Saturday 11:00.",
      },
      relatedWork: "bloom-studio",
    },
  },
  {
    slug: "barber-shops",
    name: "Barber Shops",
    to: "/industries/barber-shops",
    icon: "barber",
    page: {
      title: "AI Receptionist & Booking Websites for Barber Shops | Incodet",
      description:
        "Booking websites and a 24/7 AI calling agent for barber shops. Every call answered and every booking made, without putting the clippers down.",
      h1: "Keep cutting. We will pick up the phone.",
      intro:
        "Booking websites and a 24/7 AI calling agent for barber shops. Every call answered and every booking made, without putting the clippers down.",
      pains: [
        { title: "Clippers in hand, phone ringing", body: "You cannot stop a fade halfway to take a call." },
        { title: "The same questions all day", body: "Opening hours, prices and wait times, over and over." },
        { title: "After-hours calls are lost", body: "People book their next cut in the evening, when you are closed." },
      ],
      transcript: {
        caller: "Have you got anything this afternoon for a skin fade?",
        ai: "Yes, I have 15:30 or 16:15 free today. Can I take your name for the booking?",
        alert: "New booking: skin fade, today 15:30.",
      },
    },
  },
];

export const industries = visible(all, ["name", "to"]);

export function getIndustry(slug: string): Industry {
  const i = all.find((x) => x.slug === slug);
  if (!i) throw new Error(`Unknown industry: ${slug}`);
  return i;
}

export const industryWhatYouGet = [
  "A booking website your customers can use day or night",
  "An AI chatbot that answers questions on your site",
  "A 24/7 AI calling agent that picks up every call",
  "Owner alerts by email and WhatsApp with every booking",
];

export const industryFaq = ["How does the 24/7 AI calling agent work?", "How long does it take?", "Is there a contract?"];
