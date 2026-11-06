import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { BookingCta } from "@/components/home/HomeSections";
import { pillButton } from "@/components/site/Button";
import { CaseStudyGridCard, CaseStudyImage, CaseStudyMeta, ExternalPill, IncludeLabel, liveLabel } from "@/components/site/CaseStudyCard";
import { seoHead } from "@/components/site/PageHero";
import { breadcrumbLd } from "@/lib/seo";
import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { featuredCaseStudies, getCaseStudy } from "@/content/caseStudies";

export const Route = createFileRoute("/case-studies/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const c = getCaseStudy(params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) =>
    loaderData
      ? seoHead(`${loaderData.name} Case Study | Incodet`, loaderData.description, `/case-studies/${loaderData.slug}`, {
          type: "article",
          scripts: [breadcrumbLd([{ name: "Our work", path: "/case-studies" }, { name: loaderData.name, path: `/case-studies/${loaderData.slug}` }])],
        })
      : { meta: [{ title: "Case study not found | Incodet" }, { name: "robots", content: "noindex" }] },
  component: CaseStudyPage,
  notFoundComponent: () => (
    <Section className="pt-40">
      <div className="text-center">
        <h1 className="type-h1">Case study not found</h1>
        <Link to="/case-studies" className={pillButton({ variant: "primary" }) + " mt-8"}>Back to our work</Link>
      </div>
    </Section>
  ),
  errorComponent: () => (
    <Section className="pt-40">
      <div className="text-center">
        <h1 className="type-h1">Something went wrong</h1>
        <Link to="/case-studies" className={pillButton({ variant: "primary" }) + " mt-8"}>Back to our work</Link>
      </div>
    </Section>
  ),
});

function CaseStudyPage() {
  const c = Route.useLoaderData();
  const more = featuredCaseStudies.filter((x) => x.slug !== c.slug).slice(0, 2);
  const gallery = (c.includes ?? []).filter((i) => i.image);
  return (
    <>
      <section className="bg-bg-soft pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="container-site">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 type-small text-muted-foreground">
              <li><Link to="/case-studies" className="hover:text-ink">Our work</Link></li>
              <li aria-hidden><ChevronRight className="size-4" /></li>
              <li aria-current="page" className="text-ink">{c.name}</li>
            </ol>
          </nav>
          <Reveal className="mt-8 max-w-4xl">
            <CaseStudyMeta c={c} />
            <h1 className="mt-4 type-h1">{c.name}</h1>
            {c.title && <p className="mt-4 type-h3">{c.title}</p>}
            <p className="mt-6 max-w-2xl type-body">{c.description}</p>
            {c.liveUrl && (
              <ExternalPill href={c.liveUrl} variant="primary" className="mt-8">
                {liveLabel(c)} <ArrowUpRight aria-hidden className="size-4" />
              </ExternalPill>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-soft pb-[72px] md:pb-[120px]">
        <div className="container-site">
          <Reveal>
            <CaseStudyImage c={c} eager className="rounded-card border border-border" />
          </Reveal>
        </div>
      </section>

      {(c.challenge || c.solution || (c.tags && c.tags.length > 0)) && (
        <Section>
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            {c.challenge && (
              <Reveal>
                <h2 className="type-h2">The challenge</h2>
                <p className="mt-5 type-body">{c.challenge}</p>
              </Reveal>
            )}
            {c.solution && (
              <Reveal delay={80}>
                <h2 className="type-h2">Our solution</h2>
                <p className="mt-5 type-body">{c.solution}</p>
              </Reveal>
            )}
            {c.tags && c.tags.length > 0 && (
              <Reveal className="md:col-span-2">
                <h2 className="type-h3">Tech used</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border px-4 py-1.5 type-small text-ink">{t}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </Section>
      )}

      {c.includes && c.includes.length > 0 && (
        <Section>
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="type-h2">What we built</h2>
            <ul className="mt-8 divide-y divide-border rounded-card border border-border">
              {c.includes.map((it) => (
                <li key={it.label} className="px-6 py-4 text-[16px]">
                  <IncludeLabel it={it} />
                </li>
              ))}
            </ul>
          </Reveal>
          {gallery.length > 0 && (
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {gallery.map((it, i) => (
                <Reveal as="figure" key={it.label} delay={(i % 2) * 80}>
                  <img
                    src={it.image}
                    alt={`Screenshot of the Western Cars ${it.label.toLowerCase()}`}
                    loading="lazy"
                    width={1440}
                    height={900}
                    className="aspect-[16/10] w-full rounded-card-sm border border-border object-cover object-top"
                  />
                  <figcaption className="mt-3 type-small text-muted-foreground">
                    {it.label} ({it.year}){it.concept ? ", concept" : ""}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      )}

      {more.length > 0 && (
        <Section theme="soft">
          <SectionHeading title="More work" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {more.map((m, i) => (
              <Reveal key={m.slug} delay={i * 80}>
                <CaseStudyGridCard c={m} headingLevel="h3" />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <BookingCta />
    </>
  );
}
