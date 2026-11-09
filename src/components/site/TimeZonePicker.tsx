import * as Dialog from "@radix-ui/react-dialog";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { quickPickZones } from "@/config/booking";
import { useMediaQuery } from "@/hooks/use-motion";
import { zoneOffset } from "@/lib/booking";
import { allZones, searchZones, zoneInfo, zonePath, type ZoneInfo } from "@/lib/timezones";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (zone: string) => void;
  /** Visitor's detected zone (current tz name). */
  detected: string;
  /** Booking clock; offsets only render once it is set (after mount), so hydration never depends on it. */
  now: number | null;
  className?: string;
};

/**
 * Searchable time zone picker. Desktop: popover under the trigger. Phones: full-screen sheet with the
 * search box focused. Keyboard: Up/Down to move, Enter to choose, Esc to close. Built on cmdk + Radix.
 */
export function TimeZonePicker({ value, onChange, detected, now, className }: Props) {
  const [open, setOpen] = useState(false);
  const wide = useMediaQuery("(min-width: 640px)");
  const current = zoneInfo(value);
  const offset = now === null ? "" : zoneOffset(current.id, new Date(now));
  // Before mount (server render) the visitor's zone is unknown, so do not show a misleading default.
  const label =
    now === null
      ? "Detecting your time zone…"
      : `${current.city}, ${current.country}${offset ? ` (${offset})` : ""}`;

  const trigger = (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={`Time zone: ${label}. Change time zone`}
      className={cn(
        "flex min-h-12 w-full min-w-0 items-center justify-between gap-3 rounded-md border border-ink/40 bg-background px-3 py-3 text-left text-[16px] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span className="min-w-0 truncate">{label}</span>
      <ChevronsUpDown aria-hidden className="size-4 shrink-0 opacity-60" />
    </button>
  );

  const choose = (zone: string) => {
    onChange(zone);
    setOpen(false);
  };

  if (wide) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          align="start"
          className="z-[9300] w-[var(--radix-popover-trigger-width)] min-w-[340px] p-0"
        >
          <ZoneCommand
            value={value}
            detected={detected}
            now={now}
            onChoose={choose}
            listClass="max-h-[360px]"
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9300] bg-ink/40" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[9300] flex flex-col bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
            <Dialog.Title className="type-body font-medium text-ink">
              Choose your time zone
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="flex size-11 items-center justify-center rounded-full text-ink hover:bg-bg-soft"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </div>
          <ZoneCommand
            value={value}
            detected={detected}
            now={now}
            onChoose={choose}
            listClass="max-h-none flex-1"
            className="flex min-h-0 flex-1 flex-col"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ZoneCommand({
  value,
  detected,
  now,
  onChoose,
  listClass,
  className,
}: {
  value: string;
  detected: string;
  now: number | null;
  onChoose: (zone: string) => void;
  listClass?: string;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const zones = useMemo(() => allZones(), []);
  const offsets = useMemo(() => {
    const map = new Map<string, string>();
    if (now === null) return map;
    const at = new Date(now);
    for (const z of zones) map.set(z.id, zoneOffset(z.id, at));
    return map;
  }, [zones, now]);
  const results = useMemo(
    () => (query.trim() ? searchZones(query, zones).slice(0, 80) : []),
    [query, zones],
  );
  const byContinent = useMemo(() => {
    const groups = new Map<string, ZoneInfo[]>();
    for (const z of zones)
      (groups.get(z.continent) ?? groups.set(z.continent, []).get(z.continent)!).push(z);
    return [...groups.entries()];
  }, [zones]);

  const item = (z: ZoneInfo, key: string) => {
    const off = offsets.get(z.id);
    return (
      <CommandItem
        key={`${key}:${z.id}`}
        value={`${key}:${z.id}`}
        onSelect={() => onChoose(z.id)}
        aria-label={`${zonePath(z)}${off ? ` (${off})` : ""}`}
        className="min-h-11 cursor-pointer gap-3 px-3 py-2 text-[15px]"
      >
        <Check
          aria-hidden
          className={cn("size-4 shrink-0", z.id === value ? "opacity-100" : "opacity-0")}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-ink">{z.city}</span>
          <span className="block truncate text-[13px] text-muted-foreground">
            {z.countryCode ? `${z.continent} > ${z.country}` : z.country}
          </span>
        </span>
        {off && (
          <span className="shrink-0 text-[13px] tabular-nums text-muted-foreground">{off}</span>
        )}
      </CommandItem>
    );
  };

  return (
    <Command shouldFilter={false} loop label="Time zones" className={cn("rounded-none", className)}>
      <div className="flex items-center gap-2 border-b border-border px-3">
        <Search aria-hidden className="size-4 shrink-0 opacity-60" />
        <CommandPrimitive.Input
          autoFocus
          value={query}
          onValueChange={setQuery}
          placeholder="Search city or country"
          aria-label="Search time zones by city, country or code"
          className="h-12 w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-muted-foreground"
        />
      </div>
      <CommandList data-lenis-prevent className={cn("overscroll-contain", listClass)}>
        <CommandEmpty>No time zone found. Try a city or country.</CommandEmpty>
        {query.trim() ? (
          <CommandGroup heading={`${results.length} result${results.length === 1 ? "" : "s"}`}>
            {results.map((z) => item(z, "r"))}
          </CommandGroup>
        ) : (
          <>
            <CommandGroup heading="Your time zone">{item(zoneInfo(detected), "you")}</CommandGroup>
            <CommandGroup heading="Quick picks">
              {quickPickZones.map((z) => item(zoneInfo(z), "quick"))}
            </CommandGroup>
            {byContinent.map(([continent, list]) => (
              <CommandGroup key={continent} heading={continent}>
                {list.map((z) => item(z, "all"))}
              </CommandGroup>
            ))}
          </>
        )}
      </CommandList>
    </Command>
  );
}
