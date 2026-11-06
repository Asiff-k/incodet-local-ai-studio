import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/book")({
  head: () => pageHead("Book a Free Call", "Book a free call with Incodet to talk about your website, AI agents or software."),
  component: () => <PagePlaceholder title="Book a Free Call" />,
});
