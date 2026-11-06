import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, Contact, FolderKanban, LayoutDashboard, Stethoscope, type LucideIcon } from "lucide-react";
import { BookingCta, Process } from "@/components/home/HomeSections";
import { PillLink, pillButton } from "@/components/site/Button";
import { ContactForm } from "@/components/site/ContactForm";
import { CaseStudyGridCard } from "@/components/site/CaseStudyCard";
import { PageHero, seoHead } from "@/components/site/PageHero";
import { Card, Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { getCaseStudy, type CaseStudy } from "@/content/caseStudies";

export const Route = createFileRoute("/custom-software")({
  staticData: { sitemap: true },
  head: () =>
    seoHead(
      "Custom Software & SaaS Development | Incodet",
      "CRMs, dashboards, booking systems, client portals and full SaaS platforms, planned with you and built around how your business works.",
    , "/custom-software"),
  component: CustomSoftwarePage,
});

const builds: { title: string; body: string; icon: LucideIcon }[] = [
  { title: "CRMs", body: "Keep every customer, job and conversation in one place.", icon: Contact },
  { title: "Dashboards", body: "See bookings, calls and sales at a glance.", icon: LayoutDashboard },
  { title: "Booking systems", body: "Online booking that fits your services, staff and hours.", icon: CalendarDays },
  { title: "Client portals", body: "Give clients one place for progress, files and invoices.", icon: FolderKanban },
  { title: "Education platforms", body: "Courses, students and progress tracking in one system.", icon: BookOpen },
  { title: "Medical and clinic platforms", body: "Appointments, patient records and reminders built for clinics.", icon: Stethoscope },
];

function CustomSoftwarePage() {
  const related = ["brhex-studio", "western-cars"].map(getCaseStudy).filter((c): c is CaseStudy => Boolean(c));
  return (
    <>
      <PageHero
        badge="Custom software"
        title="Custom software built around how you work"
        actions={
          <>
            <PillLink to="/book" size="lg">Book a Free Call</PillLink>
            <PillLink to="/case-studies" variant="secondary" size="lg">See our work</PillLink>
          </>
        }
      >
        CRMs, dashboards, booking systems, client portals and full platforms for growing and established businesses.
      </PageHero>

      <Section>
        <SectionHeading title="What we build" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal as="li" key={b.title} delay={(i % 3) * 80}>
                <Card className="h-full">
                  <span className="flex size-12 items-center justify-center rounded-full bg-bg-soft">
                    <Icon aria-hidden className="size-6 text-ink" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 type-h3">{b.title}</h3>
                  <p className="mt-3 type-body">{b.body}</p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Process title="How we work" />

      <Section theme="soft">
        <SectionHeading title="Related work" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {related.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <CaseStudyGridCard c={c} headingLevel="h3" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-card bg-[image:var(--gradient-accent-soft)] p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <p className="max-w-xl text-[20px] leading-snug font-medium text-ink md:text-[22px]">
              Custom platforms usually start on our Scale plan: from $3,499 setup, from $299/month, live in 4 to 8 weeks.
            </p>
            <Link to="/pricing" className={pillButton({ variant: "secondary" })}>
              See pricing <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section theme="soft">
        <SectionHeading title="Tell us what you need" />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <ContactForm sourcePage="custom-software" />
        </Reveal>
      </Section>

      <BookingCta />
    </>
  );
}
