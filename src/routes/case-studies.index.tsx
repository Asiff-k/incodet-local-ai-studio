import { createFileRoute } from "@tanstack/react-router";
import { BookingCta } from "@/components/home/HomeSections";
import { CaseStudyGridCard } from "@/components/site/CaseStudyCard";
import { PageHero, seoHead } from "@/components/site/PageHero";
import { Reveal, Section } from "@/components/site/primitives";
import { caseStudies } from "@/content/caseStudies";

export const Route = createFileRoute("/case-studies/")({
  head: () =>
    seoHead(
      "Our Work | Incodet",
      "Websites, AI tools and platforms we have built for taxi companies, local businesses and technology teams.",
    ),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <PageHero title="Our work">Real projects with live links you can open.</PageHero>
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 80}>
              <CaseStudyGridCard c={c} />
            </Reveal>
          ))}
        </div>
      </Section>
      <BookingCta />
    </>
  );
}
