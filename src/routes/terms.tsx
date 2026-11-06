import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder, pageHead } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("Terms", "The terms that apply when you use Incodet services."),
  component: () => <PagePlaceholder title="Terms" />,
});
