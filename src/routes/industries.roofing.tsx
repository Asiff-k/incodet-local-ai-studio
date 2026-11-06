import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/site/IndustryPage";
import { seoHead } from "@/components/site/PageHero";
import { getIndustry } from "@/content/industries";

const { page } = getIndustry("roofing");

export const Route = createFileRoute("/industries/roofing")({
  head: () => seoHead(page.title, page.description),
  component: () => <IndustryPage slug="roofing" />,
});
