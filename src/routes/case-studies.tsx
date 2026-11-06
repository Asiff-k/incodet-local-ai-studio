import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/case-studies")({
  head: () => pageHead("Case Studies", "How Incodet builds websites, AI agents and software for businesses."),
  component: () => <PagePlaceholder title="Case Studies" />,
});
