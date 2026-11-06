import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/industries/epoxy-flooring")({
  head: () => pageHead("Epoxy Flooring", "Websites, AI chatbots and 24/7 AI phone agents for epoxy flooring businesses."),
  component: () => <PagePlaceholder title="Epoxy Flooring" />,
});
