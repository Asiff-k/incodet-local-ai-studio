import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

export type PanelColor = "violet" | "blue" | "orange" | "teal" | "black";
const panelBg: Record<PanelColor, string> = {
  violet: "bg-panel-violet",
  blue: "bg-panel-blue",
  orange: "bg-panel-orange",
  teal: "bg-panel-teal",
  black: "bg-panel-black",
};

/** Full-width colored panels that stick and stack on scroll. */
export function StackedPanels({
  panels,
}: {
  panels: { title: string; body: ReactNode; color: PanelColor }[];
}) {
  return (
    <div className="container-site flex flex-col gap-6 pb-6">
      {panels.map((p, i) => (
        <article
          key={p.title}
          data-theme="dark"
          style={{ top: `${88 + i * 24}px` }}
          className={cn(
            "sticky flex min-h-[70vh] flex-col justify-end overflow-hidden rounded-card p-8 text-on-dark md:min-h-[520px] md:p-14",
            panelBg[p.color],
          )}
        >
          <span
            aria-hidden
            className="absolute top-6 right-8 text-[56px] leading-none font-medium tracking-tight text-on-dark/90 md:top-10 md:right-14 md:text-[96px]"
          >
            /{String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="type-h3 text-on-dark md:text-[44px] md:leading-[1.15]">{p.title}</h3>
          <div className="mt-4 max-w-xl type-body text-on-dark">{p.body}</div>
        </article>
      ))}
    </div>
  );
}

/** Cards that slide horizontally while the page scrolls vertically (desktop). Swipe row on mobile. */
export function HorizontalScrollCards({ children }: { children: ReactNode[] }) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const pinned = desktop && !reduced;
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>();

  useEffect(() => {
    if (!pinned) {
      setHeight(undefined);
      if (track.current) track.current.style.transform = "";
      return;
    }
    const measure = () => {
      const t = track.current;
      if (!t) return;
      const dist = t.scrollWidth - window.innerWidth + 64;
      setHeight(window.innerHeight + Math.max(0, dist));
    };
    let raf = 0;
    const update = () => {
      raf = 0;
      const o = outer.current;
      const t = track.current;
      if (!o || !t) return;
      const r = o.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const dist = Math.max(0, t.scrollWidth - window.innerWidth + 64);
      t.style.transform = `translate3d(${-p * dist}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    update();
    const onResize = () => {
      measure();
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pinned, children.length]);

  return (
    <div ref={outer} style={pinned ? { height } : undefined} className="relative">
      <div className={cn(pinned && "sticky top-0 flex h-screen items-center overflow-hidden")}>
        <div
          ref={track}
          className={cn(
            "flex gap-5 px-4 md:px-8",
            pinned
              ? "will-change-transform"
              : "snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none]",
          )}
        >
          {children.map((c, i) => (
            <div key={i} className="w-[82vw] max-w-[420px] shrink-0 snap-start">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
