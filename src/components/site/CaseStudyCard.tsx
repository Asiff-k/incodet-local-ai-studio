import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/caseStudies";
import { pillButton } from "./Button";
import { ImagePlaceholder } from "./primitives";
import { cn } from "@/lib/utils";

export function ExternalPill({
  href,
  children,
  variant = "secondary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "primary-inverted" | "secondary-inverted";
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(pillButton({ variant }), className)}>
      {children}
    </a>
  );
}

export function liveLabel(c: CaseStudy) {
  return c.demo ? "View Live Demo" : "Visit Live Site";
}

export function CaseStudyImage({ c, className, eager }: { c: CaseStudy; className?: string; eager?: boolean }) {
  return c.image.ready ? (
    <img
      src={c.image.src}
      alt={c.image.alt}
      loading={eager ? "eager" : "lazy"}
      width={1440}
      height={900}
      className={cn("aspect-[16/10] w-full rounded-card-sm object-cover object-top", className)}
    />
  ) : (
    <ImagePlaceholder className={cn("aspect-[16/10] w-full", className)} />
  );
}

export function CaseStudyMeta({ c }: { c: CaseStudy }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="type-small text-muted-foreground">{c.category}</span>
      <span aria-hidden className="type-small text-muted-foreground">·</span>
      <span className="type-small text-muted-foreground">{c.year}</span>
      {c.demo && <span className="rounded-full bg-bg-soft px-3 py-1 type-small font-medium text-ink">Demo project</span>}
    </div>
  );
}

export function CaseStudyActions({ c }: { c: CaseStudy }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link to="/case-studies/$slug" params={{ slug: c.slug }} className={pillButton({ variant: "primary" })}>
        Read Case Study
      </Link>
      {c.liveUrl && (
        <ExternalPill href={c.liveUrl}>
          {liveLabel(c)} <ArrowUpRight aria-hidden className="size-4" />
        </ExternalPill>
      )}
    </div>
  );
}

/** Large horizontal card used on the homepage. */
export function CaseStudyWideCard({ c }: { c: CaseStudy }) {
  return (
    <article className="grid gap-6 rounded-card border border-border bg-background p-4 md:grid-cols-2 md:gap-10 md:p-6">
      <CaseStudyImage c={c} />
      <div className="flex flex-col justify-center p-2 md:p-4">
        <CaseStudyMeta c={c} />
        <h3 className="mt-3 type-h3">{c.title ?? c.name}</h3>
        {c.title && <p className="mt-1 font-medium text-ink">{c.name}</p>}
        <p className="mt-4 type-body">{c.description}</p>
        {c.tags && c.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {c.tags.map((t) => (
              <li key={t} className="rounded-full border border-border px-3 py-1 type-small text-ink">{t}</li>
            ))}
          </ul>
        )}
        {c.includes && c.includes.length > 0 && (
          <div className="mt-5">
            <p className="type-small font-medium text-ink">Includes</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {c.includes.slice(0, 3).map((it) => (
                <li key={it.label} className="type-small">
                  <IncludeLabel it={it} />
                </li>
              ))}
              {c.includes.length > 3 && <li className="type-small text-muted-foreground">+ more</li>}
            </ul>
          </div>
        )}
        <CaseStudyActions c={c} />
      </div>
    </article>
  );
}

export function IncludeLabel({ it }: { it: NonNullable<CaseStudy["includes"]>[number] }) {
  return (
    <>
      {it.url ? (
        <a href={it.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink underline-offset-4 hover:underline">
          {it.label} ({it.year}) <ArrowUpRight aria-hidden className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <span className="text-ink">{it.label} ({it.year})</span>
      )}
      {it.concept && <span className="ml-2 rounded-full bg-bg-soft px-2 py-0.5 text-muted-foreground">Concept</span>}
    </>
  );
}

/** Compact card used in grids. */
export function CaseStudyGridCard({ c, headingLevel = "h2" }: { c: CaseStudy; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="flex h-full flex-col rounded-card border border-border bg-background p-4 md:p-5">
      <CaseStudyImage c={c} />
      <div className="flex flex-1 flex-col p-2 pt-6 md:p-3 md:pt-6">
        <CaseStudyMeta c={c} />
        <H className="mt-3 type-h3">{c.name}</H>
        <p className="mt-3 flex-1 type-body">{c.description}</p>
        <CaseStudyActions c={c} />
      </div>
    </article>
  );
}
