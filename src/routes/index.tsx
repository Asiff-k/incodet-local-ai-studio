import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import {
  BookingCta,
  CallingAgent,
  CaseStudiesPreview,
  FactsRow,
  Faq,
  IndustriesStrip,
  PlansPreview,
  Process,
  Reviews,
  Services,
  WhoWeAre,
} from "@/components/home/HomeSections";

const title = "Incodet | Websites, AI Agents & Custom Software";
const description =
  "Booking websites, 24/7 AI chatbots and calling agents, and custom software for small, growing and established businesses. Pay only for what you use.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <IndustriesStrip />
      <WhoWeAre />
      <FactsRow />
      <CallingAgent />
      <Services />
      <Process />
      <CaseStudiesPreview />
      <PlansPreview />
      <Reviews />
      <Faq />
      <BookingCta />
    </>
  );
}
