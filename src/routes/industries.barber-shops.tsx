import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/site/IndustryPage";
import { seoHead } from "@/components/site/PageHero";
import { getIndustry } from "@/content/industries";

const { page } = getIndustry("barber-shops");

export const Route = createFileRoute("/industries/barber-shops")({
  head: () => seoHead(page.title, page.description),
  component: () => <IndustryPage slug="barber-shops" />,
});
