import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Hammer,
  House,
  Layers,
  MessageCircle,
  PaintRoller,
  Phone,
  Rocket,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { featuredCaseStudies as caseStudies } from "@/content/caseStudies";
import { faq } from "@/content/faq";
import { industries, type Industry } from "@/content/industries";
import { plansNote } from "@/content/plans";
import { CaseStudyWideCard } from "@/components/site/CaseStudyCard";
import { PlanCards } from "@/components/site/PlanCards";
import { reviews } from "@/content/reviews";
import { services, type Service } from "@/content/services";
import { PillLink, pillButton } from "@/components/site/Button";
import { Accordion, SegmentedTabs } from "@/components/site/Interactive";
import { Logo } from "@/components/site/Logo";
import { Card, PillBadge, Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { RevealText } from "@/components/site/RevealText";
import { HorizontalScrollCards, StackedPanels } from "@/components/site/ScrollSections";
import { cn } from "@/lib/utils";
import {
  AutomationUI,
  BookingSiteUI,
  BuildUI,
  CalendarUI,
  CallCardUI,
  ChatUI,
  DashboardUI,
  DiscoveryUI,
  LaunchUI,
  NotificationUI,
  PlanUI,
} from "./MiniUI";

function ExternalPill({ href, children, variant }: { href: string; children: ReactNode; variant: "primary" | "secondary" | "primary-inverted" | "secondary-inverted" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={pillButton({ variant })}>
      {children}
    </a>
  );
}

/* 2. Industries strip */
const industryIcon: Record<Industry["icon"], LucideIcon> = {
  roof: House,
  floor: PaintRoller,
  salon: Sparkles,
  barber: Scissors,
};

export function IndustriesStrip() {
  return (
    <section aria-labelledby="industries-title" className="relative z-10 bg-bg-soft pt-4 pb-[72px] md:pb-[120px]">
      <div className="container-site">
        <h2 id="industries-title" className="text-center type-small font-medium text-muted-foreground">
          Built for local service businesses
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {industries.map((ind, i) => {
            const Icon = industryIcon[ind.icon];
            return (
              <Reveal as="li" key={ind.slug} delay={i * 80}>
                <Link
                  to={ind.to}
                  className="group flex h-full flex-col items-center justify-center gap-3 rounded-card-sm border border-border bg-background px-4 py-8 text-center transition-shadow duration-300 hover:shadow-soft md:py-10"
                >
                  <Icon aria-hidden className="size-7 text-ink" strokeWidth={1.5} />
                  <span className="text-[17px] font-medium text-ink">{ind.name}</span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* 3. Who we are */
export function WhoWeAre() {
  return (
    <Section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl text-center md:pb-24">
        <Reveal>
          <PillBadge>Who we are</PillBadge>
        </Reveal>
        <h2 className="sr-only">Who we are</h2>
        <RevealText
          size="h2"
          className="mt-8"
          text="Incodet builds websites, AI agents and custom software for businesses of every size. Small businesses get online bookings, growing businesses automate calls and enquiries, and established companies get complete platforms. You pay for the features you need and use."
        />
        <div aria-hidden className="pointer-events-none hidden md:block">
          <span className="absolute top-0 left-[4%] -rotate-6 rounded-full bg-[image:var(--gradient-accent)] px-4 py-2 type-small font-semibold text-on-dark shadow-pill">
            24/7
          </span>
          <span className="absolute right-[8%] bottom-2 rotate-6 rounded-full border border-border bg-background px-4 py-2 type-small font-medium text-ink shadow-soft ">
            No lock-in
          </span>
          <span className="absolute bottom-0 left-[14%] -rotate-3 rounded-full bg-ink px-4 py-2 type-small font-medium text-primary-foreground shadow-pill">
            From $499
          </span>
        </div>
      </div>
    </Section>
  );
}

/* 4. Facts row */
const facts = [
  { big: "24/7", label: "AI answers your calls" },
  { big: "1 to 2 weeks", label: "Starter websites launch" },
  { big: "From $499", label: "One-time setup" },
  { big: "No lock-in", label: "Contracts" },
];

export function FactsRow() {
  return (
    <section aria-label="Key facts" className="bg-background pb-[72px] md:pb-[120px]">
      <div className="container-site">
        <ul className="grid grid-cols-2 border-t border-l border-border md:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal as="li" key={f.big} delay={i * 80} className="border-r border-b border-border px-4 py-8 text-center md:px-6 md:py-12">
              <p className="text-[26px] leading-tight font-medium tracking-tight text-ink md:text-[36px]">{f.big}</p>
              <p className="mt-2 type-small text-muted-foreground">{f.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 5. AI calling agent */
const callSteps = [
  { title: "A customer calls", body: "Day, night or weekend, including after hours.", ui: CallCardUI },
  { title: "The AI agent answers", body: "It greets the caller, answers questions and gives your business information.", ui: ChatUI },
  { title: "It books the appointment", body: "The booking goes straight into your calendar.", ui: CalendarUI },
  { title: "You get the details", body: "Owner alerts by email or WhatsApp, with the caller's name and request.", ui: NotificationUI },
];

export function CallingAgent() {
  return (
    <section data-theme="dark" aria-labelledby="calling-title" className="bg-dark py-[72px] md:py-[120px]">
      <div className="container-site text-center">
        <Reveal>
          <PillBadge tone="mint" icon={<Phone aria-hidden className="size-4" />}>
            24/7 AI Calling Agent
          </PillBadge>
          <h2 id="calling-title" className="mx-auto mt-6 max-w-4xl type-h2 text-on-dark">
            Picks up every call, books appointments and sends you the details.
          </h2>
        </Reveal>
      </div>
      <div className="mt-12 md:mt-4">
        <HorizontalScrollCards>
          {callSteps.map((s, i) => {
            const dark = i % 2 === 0;
            const UI = s.ui;
            return (
              <article
                key={s.title}
                className={cn(
                  "flex h-[440px] flex-col justify-between rounded-card p-6 md:h-[480px] md:p-8",
                  dark ? "border border-on-dark/15 bg-dark-card text-on-dark" : "bg-background text-ink",
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="type-small font-medium opacity-80">Step {i + 1}</span>
                </div>
                <UI tone={dark ? "light" : "dark"} />
                <div>
                  <h3 className={cn("type-h3", dark ? "text-on-dark" : "text-ink")}>{s.title}</h3>
                  <p className={cn("mt-2 type-body", dark ? "text-on-dark-muted" : "text-body")}>{s.body}</p>
                </div>
              </article>
            );
          })}
        </HorizontalScrollCards>
      </div>
      <div className="mt-10 flex justify-center">
        <PillLink to="/book" variant="primary-inverted" size="lg">
          Book a Free Call
        </PillLink>
      </div>
    </section>
  );
}

/* 6. Services */
const serviceVisual: Record<Service["id"], ReactNode> = {
  booking: <BookingSiteUI />,
  chatbot: <ChatUI />,
  calling: (
    <div className="flex flex-col gap-3">
      <CallCardUI />
      <CalendarUI />
    </div>
  ),
  automation: <AutomationUI />,
  software: <DashboardUI />,
};

export function Services() {
  return (
    <section aria-labelledby="services-title" className="bg-background pt-[72px] md:pt-[120px]">
      <div className="container-site mb-10 md:mb-14">
        <Reveal>
          <h2 id="services-title" className="text-center type-h2">What we build</h2>
        </Reveal>
      </div>
      <StackedPanels
        panels={services.map((s) => ({
          title: s.title,
          color: s.color,
          body: s.description,
          actions: (
            <PillLink to={s.cta.to} variant="primary-inverted">
              {s.cta.label}
            </PillLink>
          ),
          visual: <div className="mx-auto max-w-md">{serviceVisual[s.id]}</div>,
        }))}
      />
    </section>
  );
}

/* 7. Process */
const steps: { title: string; body: string; icon: LucideIcon; ui: () => ReactNode }[] = [
  { title: "Discovery Call", body: "We learn your business, your customers and what you need. Free, no commitment.", icon: Phone, ui: DiscoveryUI },
  { title: "Plan & Design", body: "We map the features, design the screens and agree on scope before building.", icon: Layers, ui: PlanUI },
  { title: "Build & Integrate", body: "We build, connect your tools and show you progress every week.", icon: Hammer, ui: BuildUI },
  { title: "Launch & Support", body: "We go live, test everything and stay on to support and improve it.", icon: Rocket, ui: LaunchUI },
];

export function Process({ title = "How it works", intro = "A simple process, from first call to launch." }: { title?: string; intro?: string }) {
  return (
    <Section>
      <SectionHeading title={title}>{intro}</SectionHeading>
      <Reveal className="mt-12 rounded-card bg-[image:var(--gradient-accent-soft)] p-3 pt-6 md:p-8">
        <SegmentedTabs
          tabs={steps.map((s) => {
            const Icon = s.icon;
            const UI = s.ui;
            return {
              label: s.title,
              content: (
                <div className="grid gap-8 rounded-card bg-background p-6 md:grid-cols-2 md:items-center md:p-12">
                  <div>
                    <span className="flex size-12 items-center justify-center rounded-full bg-bg-soft">
                      <Icon aria-hidden className="size-6 text-ink" strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-6 type-h3">{s.title}</h3>
                    <p className="mt-3 type-body">{s.body}</p>
                    <div className="mt-8">
                      <PillLink to="/book">Book a Free Call</PillLink>
                    </div>
                  </div>
                  <div className="rounded-card-sm bg-bg-soft p-6 md:p-10">
                    <UI />
                  </div>
                </div>
              ),
            };
          })}
        />
      </Reveal>
    </Section>
  );
}

/* 8. Case studies */
export function CaseStudiesPreview() {
  if (!caseStudies.length) return null;
  return (
    <Section theme="soft">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="type-h2">Our work</h2>
          <p className="mt-4 type-body">Real projects with live links you can open.</p>
        </Reveal>
        <PillLink to="/case-studies" variant="secondary" className="self-start md:self-auto">
          View all case studies <ArrowRight aria-hidden className="size-4" />
        </PillLink>
      </div>
      <div className="mt-12 flex flex-col gap-6">
        {caseStudies.map((c) => (
          <Reveal key={c.slug}>
            <CaseStudyWideCard c={c} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* 9. Plans */
export function PlansPreview() {
  return (
    <Section>
      <Reveal className="text-center">
        <h2 className="type-h2">Pay for what you use. Nothing more.</h2>
        <p className="mt-4 type-small text-muted-foreground">All prices in USD. No lock-in contracts.</p>
      </Reveal>
      <div className="mt-12">
        <PlanCards />
      </div>
      <div className="mt-10 flex flex-col items-center gap-5 text-center">
        <p className="max-w-2xl type-body">{plansNote}</p>
        <PillLink to="/pricing" variant="secondary">
          See full pricing <ArrowRight aria-hidden className="size-4" />
        </PillLink>
      </div>
    </Section>
  );
}

/* 10. Reviews (hidden while empty) */
export function Reviews() {
  if (!reviews.length) return null;
  return (
    <Section theme="soft">
      <SectionHeading title="What our clients say" />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <Card key={r.name + r.business}>
            <blockquote className="type-body text-ink">{r.quote}</blockquote>
            <p className="mt-6 font-medium text-ink">{r.name}</p>
            <p className="type-small text-muted-foreground">{r.business}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* 11. FAQ */
export function Faq() {
  if (!faq.length) return null;
  return (
    <Section theme="soft">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <h2 className="type-h2">Questions, answered</h2>
          <p className="type-body">Can't find what you need? Book a free call or message us on WhatsApp.</p>
          <div className="rounded-card border border-border bg-background p-6 md:p-8">
            <div className="flex items-center gap-3">
              <Logo variant="mark" />
              <p className="text-[18px] font-medium text-ink">Book a free call</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <PillLink to="/book">Book a Free Call</PillLink>
              <ExternalPill href={site.whatsapp} variant="secondary">
                <MessageCircle aria-hidden className="size-4" /> WhatsApp
              </ExternalPill>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <Accordion items={faq.map((f) => ({ question: f.question, answer: f.answer }))} />
        </Reveal>
      </div>
    </Section>
  );
}

/* 12. Booking CTA */
export function BookingCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-background pt-[72px] md:pt-[120px]">
      <div className="container-site">
        <Reveal>
          <div data-theme="dark" className="rounded-card bg-dark px-6 py-16 text-center md:px-12 md:py-24">
            <h2 id="cta-title" className="type-h2 text-on-dark">Book a free call</h2>
            <p className="mx-auto mt-5 max-w-xl type-body text-on-dark-muted">
              We learn your business, your customers and what you need. Free, no commitment.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <PillLink to="/book" variant="primary-inverted" size="lg">
                Book a Free Call
              </PillLink>
              <ExternalPill href={site.whatsapp} variant="secondary-inverted">
                <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
              </ExternalPill>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
