import type { PanelColor } from "@/components/site/ScrollSections";
import { visible } from "./visible";

export type Service = {
  id: "booking" | "chatbot" | "calling" | "automation" | "software";
  title: string;
  description: string;
  color: PanelColor;
  cta: { label: string; to: string };
  todo?: boolean;
};

const all: Service[] = [
  { id: "booking", title: "Booking Websites", description: "Modern, fast websites where customers can book you online, day or night.", color: "violet", cta: { label: "Book a Free Call", to: "/book" } },
  { id: "chatbot", title: "AI Website Chatbot", description: "Answers customer questions instantly and captures every lead, 24/7.", color: "blue", cta: { label: "Book a Free Call", to: "/book" } },
  { id: "calling", title: "24/7 AI Calling Agent", description: "Picks up every call, books appointments and sends you the details.", color: "orange", cta: { label: "Book a Free Call", to: "/book" } },
  { id: "automation", title: "Business Automation", description: "Reminders, follow-ups and notifications that run on their own.", color: "teal", cta: { label: "Book a Free Call", to: "/book" } },
  { id: "software", title: "SaaS & Custom Software", description: "CRMs, dashboards and full platforms built around how you work.", color: "black", cta: { label: "Explore Custom Software", to: "/custom-software" } },
];

export const services = visible(all, ["title", "description"]);
