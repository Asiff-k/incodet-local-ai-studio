import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/industries/salons")({
  head: () => pageHead("Salons", "Booking websites, AI chatbots and 24/7 AI phone agents for salons."),
  component: () => <PagePlaceholder title="Salons" />,
});
