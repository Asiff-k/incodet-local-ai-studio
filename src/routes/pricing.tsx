import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/pricing")({
  head: () => pageHead("Pricing", "Simple plans for websites, AI chatbots and AI phone agents. Pay only for what you use."),
  component: () => <PagePlaceholder title="Pricing" />,
});
