import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { CalendarClock, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { pillButton } from "./Button";

const CalInline = lazy(() => import("./CalInline"));

/** Cal.com inline embed when site.calLink is set, otherwise an honest "opens soon" card. */
export function CalBooking() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const link: string = site.calLink;

  useEffect(() => {
    if (!link || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [link]);

  if (!link) {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-card border border-border bg-background p-8 md:p-12">
        <span className="flex size-12 items-center justify-center rounded-full bg-bg-soft">
          <CalendarClock aria-hidden className="size-6 text-ink" strokeWidth={1.5} />
        </span>
        <h2 className="mt-6 type-h3">Online booking opens soon</h2>
        <p className="mt-3 type-body">
          For now, send us a message below or reach us on WhatsApp and we will set up a time with you.
        </p>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={pillButton({ className: "mt-8" })}>
          <MessageCircle aria-hidden className="size-4" /> WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div ref={ref} className="min-h-[600px] overflow-hidden rounded-card border border-border bg-background">
      {near && (
        <Suspense fallback={null}>
          <CalInline calLink={link} />
        </Suspense>
      )}
    </div>
  );
}
