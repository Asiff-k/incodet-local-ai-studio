import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { loadScrollMotion } from "@/lib/scroll-motion";

/** Native scrolling remains authoritative for touch, keyboard and reduced motion. */
export function SmoothScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const setup = async () => {
      if (!enabled.matches || navigator.maxTouchPoints > 0) return;
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), loadScrollMotion()]);
      if (cancelled || !enabled.matches) return;
      const lenis = new Lenis({ duration: 1.05, anchors: true, syncTouch: false, prevent: (node) => Boolean(node.closest('[role="dialog"], [data-lenis-prevent]')) });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", () => {
        ScrollTrigger.update();
        window.dispatchEvent(new Event("incodet:lenis-scroll"));
      });
      gsap.ticker.add(tick);
      const lock = () => {
        if (document.body.style.overflow === "hidden") lenis.stop();
        else lenis.start();
      };
      const observer = new MutationObserver(lock);
      observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
      lock();
      document.documentElement.dataset["smoothScroll"] = "enabled";
      dispose = () => {
        observer.disconnect();
        gsap.ticker.remove(tick);
        lenis.destroy();
        delete document.documentElement.dataset["smoothScroll"];
      };
    };
    const change = () => { cancelled = true; dispose?.(); dispose = undefined; cancelled = false; void setup(); };
    void setup();
    enabled.addEventListener("change", change);
    return () => { cancelled = true; enabled.removeEventListener("change", change); dispose?.(); };
  }, [pathname]);
  return null;
}