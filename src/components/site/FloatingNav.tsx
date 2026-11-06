import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Mail, MessageCircle, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { activeSocials, industryLinks, site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { PillLink } from "./Button";
import { SocialIcon } from "./SocialIcon";

export function FloatingNav() {
  const [pct, setPct] = useState(0);
  const [inverted, setInverted] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
      const nav = navRef.current;
      if (!nav) return;
      const r = nav.getBoundingClientRect();
      const y = r.top + r.height / 2;
      const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-theme="dark"]')).some(
        (el) => {
          if (nav.contains(el)) return false;
          const b = el.getBoundingClientRect();
          return b.top <= y && b.bottom >= y;
        },
      );
      setInverted(dark);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    menuBtn.current?.focus();
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-40 flex justify-center md:bottom-6">
        <div
          ref={navRef}
          className={cn(
            "pointer-events-auto flex h-14 w-full items-center justify-between rounded-full pr-2 pl-5 shadow-pill transition-colors duration-500 md:w-[360px]",
            inverted ? "bg-background text-ink" : "bg-dark text-on-dark",
          )}
        >
          <Link to="/" aria-label="Incodet home" className="rounded-md">
            <Logo variant="mark" tone={inverted ? "ink" : "white"} />
          </Link>
          <span className="type-small font-medium tabular-nums" aria-label={`Page scrolled ${pct}%`}>
            {pct}%
          </span>
          <div className="flex items-center">
            <span
              aria-hidden
              className={cn("mr-1 h-6 w-px", inverted ? "bg-border" : "bg-on-dark/25")}
            />
            <button
              ref={menuBtn}
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className={cn(
                "flex h-10 items-center gap-2 rounded-full px-4 type-small font-medium transition-colors",
                inverted ? "hover:bg-bg-soft" : "hover:bg-on-dark/10",
              )}
            >
              Menu <Menu aria-hidden className="size-4" />
            </button>
          </div>
        </div>
      </div>
      {open && <MenuOverlay onClose={close} />}
    </>
  );
}

const menuLinks = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  ...industryLinks,
  { to: "/custom-software", label: "Custom Software" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/book", label: "Book a Call" },
  { to: "/portal", label: "Client Portal" },
];

function MenuOverlay({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0]!;
        const last = f[f.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 overflow-y-auto bg-background animate-in fade-in duration-300"
    >
      <div className="container-site flex min-h-full flex-col py-6">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" onClick={onClose} aria-label="Incodet home" className="rounded-md">
            <Logo />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-12 items-center justify-center rounded-full bg-bg-soft text-ink hover:bg-border"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <div className="mt-10 grid flex-1 gap-12 md:grid-cols-[1.4fr_1fr]">
          <nav aria-label="Menu">
            <ul className="flex flex-col gap-1">
              {menuLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className="inline-block rounded-md text-[32px] leading-[1.25] font-medium tracking-tight text-ink transition-colors hover:text-muted-foreground md:text-[44px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-6 pb-28 md:justify-end">
            <ul className="flex flex-col gap-3 type-body">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-ink hover:underline">
                  <Mail aria-hidden className="size-5" /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-ink hover:underline">
                  <MessageCircle aria-hidden className="size-5" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 text-ink hover:underline">
                  <Phone aria-hidden className="size-5" /> {site.phoneDisplay}
                </a>
              </li>
            </ul>
            {activeSocials.length > 0 && (
              <ul className="flex gap-2">
                {activeSocials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-11 items-center justify-center rounded-full border border-border text-ink hover:bg-bg-soft"
                    >
                      <SocialIcon name={s.key} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <div>
              <PillLink to="/book" size="lg" onClick={onClose}>
                Book a Free Call
              </PillLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
