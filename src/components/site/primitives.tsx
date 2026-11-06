import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

export function PillBadge({
  icon,
  children,
  className,
}: {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-small font-medium text-ink shadow-soft",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

type Theme = "light" | "soft" | "dark";
const themeClass: Record<Theme, string> = {
  light: "bg-background",
  soft: "bg-bg-soft",
  dark: "bg-dark text-on-dark-muted [&_h1]:text-on-dark [&_h2]:text-on-dark [&_h3]:text-on-dark",
};

export function Section({
  theme = "light",
  children,
  className,
  containerClassName,
  id,
  as: Tag = "section",
}: {
  theme?: Theme;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      id={id}
      data-theme={theme === "dark" ? "dark" : "light"}
      className={cn("section-y", themeClass[theme], className)}
    >
      <div className={cn("container-site", containerClassName)}>{children}</div>
    </Tag>
  );
}

export function SectionHeading({
  title,
  children,
  className,
}: {
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-3xl text-center", className)}>
      <h2 className="text-h2">{title}</h2>
      {children && <p className="mx-auto mt-5 max-w-2xl text-body">{children}</p>}
    </Reveal>
  );
}

export function Card({
  children,
  className,
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  size?: "lg" | "sm";
}) {
  return (
    <div
      className={cn(
        "border border-border bg-card p-6 shadow-soft md:p-8",
        size === "lg" ? "rounded-card" : "rounded-card-sm p-5 md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Fades children up once when they enter the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}
