import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/custom-software")({
  head: () => pageHead("Custom Software", "Custom software and SaaS built around how your business works."),
  component: () => <PagePlaceholder title="Custom Software" />,
});
