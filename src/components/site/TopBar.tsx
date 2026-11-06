import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { PillLink } from "./Button";

/** Non-sticky top bar, transparent so it sits over the hero. */
export function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-site flex h-20 items-center justify-between md:h-24">
        <Link to="/" aria-label="Incodet home" className="rounded-md">
          <Logo />
        </Link>
        <PillLink to="/book" size="sm">
          Book a Free Call
        </PillLink>
      </div>
    </header>
  );
}
