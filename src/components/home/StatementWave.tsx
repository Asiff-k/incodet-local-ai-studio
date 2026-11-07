import { Fragment, useEffect, useRef } from "react";
import { loadScrollMotion } from "@/lib/scroll-motion";
import { PillBadge } from "@/components/site/primitives";

const sentence = "Incodet builds websites, AI agents and custom software for businesses of every size. Small businesses get online bookings, growing businesses automate calls and enquiries, and established companies get complete platforms. You pay for the features you need and use.";
const tags = [
  { label: "Never miss a call", cls: "wave-tag-call", rotation: -6 },
  { label: "Book online 24/7", cls: "wave-tag-book", rotation: 5 },
  { label: "Live in 1 to 2 weeks", cls: "wave-tag-live", rotation: -3 },
];

export function StatementWave() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;
    void loadScrollMotion().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 768px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { desktop, reduced } = context.conditions ?? {};
        const el = root.current;
        if (!el) return;
        const words = Array.from(el.querySelectorAll<HTMLElement>("[data-wave-word]"));
        const pills = Array.from(el.querySelectorAll<HTMLElement>("[data-wave-pill]"));
        const paragraph = el.querySelector<HTMLElement>("[data-wave-paragraph]");
        const place = () => {
          if (!desktop || !paragraph) return [10, 15, 24];
          const lines: HTMLElement[][] = [];
          words.forEach((word) => {
            const line = lines.find((l) => l[0]?.offsetTop === word.offsetTop);
            if (line) line.push(word); else lines.push([word]);
          });
          return pills.map((pill, i) => {
            const line = lines[i] ?? lines[lines.length - 1] ?? [];
            const word = i === 0 ? line[line.length - 2] : i === 1 ? line[1] : line[Math.floor(line.length / 2)];
            if (!word) return 0;
            pill.style.left = `${word.offsetLeft + word.offsetWidth / 2}px`;
            pill.style.top = `${word.offsetTop + word.offsetHeight / 2}px`;
            return words.indexOf(word);
          });
        };
        const positions = place();
        if (reduced) return;
        gsap.set(words, { opacity: 0 });
        gsap.set(pills, { opacity: 0, scale: 0.6 });
        const tl = gsap.timeline({ scrollTrigger: {
          id: "statement-wave", trigger: el, start: desktop ? "top top" : "top 85%",
          end: desktop ? () => `+=${window.innerHeight * 1.5}` : "bottom 40%",
          pin: Boolean(desktop), scrub: true, invalidateOnRefresh: true, refreshPriority: 20,
          onRefresh: place,
        } });
        words.forEach((word, i) => {
          tl.to(word, { opacity: 1, color: "var(--wave-cyan)", duration: 1.5 }, i)
            .to(word, { color: "var(--wave-blue)", duration: 1 }, i + 1.5)
            .to(word, { color: "var(--wave-purple)", duration: 1 }, i + 2.5)
            .to(word, { color: "var(--wave-magenta)", duration: 1 }, i + 3.5)
            .to(word, { color: "var(--wave-ink)", duration: 1.5 }, i + 4.5);
        });
        pills.forEach((pill, i) => {
          tl.to(pill, { opacity: 1, scale: 1.05, rotation: (tags[i]?.rotation ?? 0) + 3, duration: 1.2, ease: "back.out(2)" }, positions[i] ?? 0)
            .to(pill, { scale: 1, rotation: tags[i]?.rotation ?? 0, duration: 1 }, (positions[i] ?? 0) + 1.2);
        });
        ScrollTrigger.refresh();
      });
      revert = () => mm.revert();
    });
    return () => { cancelled = true; revert?.(); };
  }, []);
  return (
    <section ref={root} className="statement-wave bg-background" aria-labelledby="who-title">
      <div className="container-site mx-auto text-center">
        <PillBadge>Who we are</PillBadge>
        <h2 id="who-title" className="sr-only">Who we are</h2>
        <div className="relative mx-auto mt-8 max-w-[1100px]">
          <p className="sr-only">{sentence}</p>
          <p data-wave-paragraph aria-hidden="true" className="wave-paragraph">
            {sentence.split(" ").map((word, i) => <Fragment key={i}><span data-wave-word className="inline-block">{word}</span>{" "}</Fragment>)}
          </p>
          <ul className="wave-pills mt-8 flex flex-wrap justify-center gap-3 md:mt-0">
            {tags.map((tag) => <li data-wave-pill key={tag.label} className={`wave-pill ${tag.cls}`}><span>{tag.label}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}