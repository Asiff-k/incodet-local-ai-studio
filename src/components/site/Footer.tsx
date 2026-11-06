import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { allSocials, industryLinks, pageLinks, site } from "@/config/site";
import { PillLink } from "./Button";
import { Logo } from "./Logo";
import { SocialIcon } from "./SocialIcon";

const linkCls = "rounded-sm text-body transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer className="bg-background pt-20 pb-32 md:pt-28" data-theme="light">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-8 max-w-md text-[34px] leading-[1.15] font-medium tracking-tight text-ink md:text-[44px]">
              Pay for what you use. Nothing more.
            </p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="type-small text-muted-foreground">Drop us a line</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="text-ink hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="type-small text-muted-foreground">Call us</dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className="text-ink hover:underline">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="type-small text-muted-foreground">Message us</dt>
                <dd className="mt-1">
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline">
                    WhatsApp
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-10">
              <PillLink to="/book">Book a Free Call</PillLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <FooterCol title="Pages">
              {pageLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </FooterCol>
            <FooterCol title="Industries">
              {industryLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </FooterCol>
            <FooterCol title="Follow Us">
              {allSocials.map((s) => (
                <li key={s.key}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}>
                      <SocialIcon name={s.key} /> {s.label}
                    </a>
                  ) : (
                    <span aria-label={`${s.label}, coming soon`} className="inline-flex items-center gap-2 text-body opacity-50">
                      <SocialIcon name={s.key} /> <span aria-hidden>{s.label}</span>
                    </span>
                  )}
                </li>
              ))}
            </FooterCol>
            <FooterCol title="Our location">
              <li className="inline-flex items-center gap-2 text-ink">
                <MapPin aria-hidden className="size-4 shrink-0" />
                {site.locationLabel}
              </li>
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {site.address}
                </a>
              </li>
            </FooterCol>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 type-small text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="type-small font-medium text-muted-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3 text-[16px]">{children}</ul>
    </div>
  );
}
