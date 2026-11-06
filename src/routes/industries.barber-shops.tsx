import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/industries/barber-shops")({
  head: () => pageHead("Barber Shops", "Booking websites, AI chatbots and 24/7 AI phone agents for barber shops."),
  component: () => <PagePlaceholder title="Barber Shops" />,
});
