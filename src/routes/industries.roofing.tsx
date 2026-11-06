import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/industries/roofing")({
  head: () => pageHead("Roofing", "Websites, AI chatbots and 24/7 AI phone agents for roofing businesses."),
  component: () => <PagePlaceholder title="Roofing" />,
});
