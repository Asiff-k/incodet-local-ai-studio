import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/site/IndustryPage";
import { seoHead } from "@/components/site/PageHero";
import { getIndustry } from "@/content/industries";

const { page } = getIndustry("epoxy-flooring");

export const Route = createFileRoute("/industries/epoxy-flooring")({
  head: () => seoHead(page.title, page.description),
  component: () => <IndustryPage slug="epoxy-flooring" />,
});
