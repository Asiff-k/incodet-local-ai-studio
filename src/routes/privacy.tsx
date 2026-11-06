import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("Privacy Policy", "How Incodet collects, uses and protects your information."),
  component: () => <PagePlaceholder title="Privacy Policy" />,
});
