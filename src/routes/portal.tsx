import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/portal")({
  head: () => pageHead("Client Portal", "Sign in to the Incodet client portal."),
  component: () => <PagePlaceholder title="Client Portal" />,
});
