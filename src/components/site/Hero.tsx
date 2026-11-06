import { Check, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-motion";
import { PillLink } from "./Button";
import { PillBadge } from "./primitives";

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const outer = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const fade = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const extras = useRef<HTMLDivElement[]>([]);
  const [loadVideo, setLoadVideo] = useState(false);

  // Poster first; the video loads after the page has loaded, on larger screens only.
  useEffect(() => {
    if (reduced || !window.matchMedia("(min-width: 768px)").matches) return;
    const go = () => setLoadVideo(true);
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, [reduced]);

  useEffect(() => {
    const apply = (p: number) => {
      if (media.current) media.current.style.transform = reduced ? "" : `scale(${1 + 0.08 * p})`;
      if (fade.current) fade.current.style.opacity = String(p);
      if (title.current) {
        // Bottom stop moves from ink to light grey.
        const g = Math.round(10 + (184 - 10) * p);
        title.current.style.setProperty("--hero-bottom", `rgb(${g},${g},${g})`);
      }
      extras.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = String(1 - Math.min(1, p * 1.6));
        el.style.transform = reduced ? "" : `translateY(${-24 * ease(p)}px)`;
      });
    };
    if (reduced) {
      apply(0);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const o = outer.current;
      if (!o) return;
      const r = o.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      apply(span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0);
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
  }, [reduced]);

  const addExtra = (el: HTMLDivElement | null) => {
    if (el && !extras.current.includes(el)) extras.current.push(el);
  };

  return (
    <div ref={outer} className={reduced ? "relative" : "relative h-[200svh]"}>
      <section
        aria-labelledby="hero-title"
        className="sticky top-0 flex h-svh min-h-[640px] items-center justify-center overflow-hidden bg-bg-soft"
      >
        <div ref={media} aria-hidden className="absolute inset-0 origin-center will-change-transform">
          {loadVideo ? (
            <video
              className="size-full object-cover"
              src={site.heroVideo.src}
              poster={site.heroVideo.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img src={site.heroVideo.poster} alt="" className="size-full object-cover" fetchPriority="high" />
          )}
        </div>
        {/* Bright wash over the top two thirds keeps the black headline AA readable. */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg)_0%,color-mix(in_oklab,var(--bg)_82%,transparent)_45%,color-mix(in_oklab,var(--bg)_55%,transparent)_70%,transparent_100%)]" />
        <div
          ref={fade}
          aria-hidden
          style={{ opacity: 0 }}
          className="absolute inset-0 bg-[linear-gradient(0deg,var(--bg-soft)_0%,var(--bg-soft)_45%,transparent_100%)]"
        />

        <div className="container-site relative z-10 flex flex-col items-center pt-16 text-center">
          <div ref={addExtra}>
            <PillBadge icon={<MapPin aria-hidden className="size-4" />}>{site.locationLabel}</PillBadge>
          </div>
          <h1
            id="hero-title"
            ref={title}
            style={{ ["--hero-bottom" as string]: "var(--ink)" }}
            className="type-h1 mt-6 max-w-[920px] bg-[linear-gradient(180deg,var(--ink)_20%,var(--hero-bottom)_100%)] bg-clip-text text-transparent"
          >
            Websites, AI Agents &amp; Software That Grow With Your Business
          </h1>
          <div ref={addExtra} className="mt-6 max-w-[640px]">
            <p className="text-body type-body">
              AI that answers calls, books appointments and replies to customers while you work, so
              your business never stops. Built for businesses of every size.
            </p>
          </div>
          <div ref={addExtra} className="mt-9 flex flex-col items-center gap-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PillLink to="/book" size="lg">
                Book a Free Call
              </PillLink>
              <PillLink to="/pricing" variant="secondary" size="lg">
                See Plans
              </PillLink>
            </div>
            <p className="inline-flex items-center gap-2 type-small font-medium text-ink">
              <Check aria-hidden className="size-4" /> No lock-in contracts
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
