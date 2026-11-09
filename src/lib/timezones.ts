import { zoneCountry, zoneCurrent } from "@/content/timezones";

export type ZoneInfo = {
  /** Current tz database name, e.g. "Europe/Helsinki". */
  id: string;
  city: string;
  countryCode: string;
  country: string;
  continent: string;
  /** Lowercase, accent-free text the search matches against. */
  haystack: string;
};

/** Current tz name for any zone a browser may report (e.g. "Asia/Calcutta" becomes "Asia/Kolkata"). */
export function currentZone(zone: string) {
  return zoneCurrent[zone] ?? zone;
}

const southAmerica = new Set("AR BO BR CL CO EC FK GF GY PE PY SR UY VE GS".split(" "));
const atlanticContinent: Record<string, string> = {
  IS: "Europe",
  PT: "Europe",
  ES: "Europe",
  FO: "Europe",
  BM: "North America",
  CV: "Africa",
  SH: "Africa",
  FK: "South America",
  GS: "South America",
};

/** Continent label from the zone's first part, refined by country where the tz region is ambiguous. */
function continentOf(zone: string, cc: string) {
  const region = zone.split("/")[0] ?? "";
  if (region === "America") return southAmerica.has(cc) ? "South America" : "North America";
  if (region === "Atlantic") return atlanticContinent[cc] ?? "Atlantic";
  if (region === "Australia" || region === "Pacific") return "Oceania";
  if (region === "Indian") return "Indian Ocean";
  if (region === "Arctic") return "Europe";
  if (["Africa", "Asia", "Europe", "Antarctica"].includes(region)) return region;
  return "Other";
}

/** "America/Argentina/Buenos_Aires" becomes "Buenos Aires". */
export function cityOf(zone: string) {
  return (zone.split("/").pop() ?? zone).replace(/_/g, " ");
}

export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9+ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Extra words people search by, per country code. */
const countryAliases: Record<string, string[]> = {
  GB: ["uk", "england", "britain", "great britain", "scotland", "wales", "northern ireland"],
  US: ["usa", "us", "america", "united states", "states"],
  AE: ["uae", "emirates"],
  IN: ["india", "bharat"],
  BD: ["bangladesh"],
  AU: ["australia", "aus"],
  NZ: ["new zealand", "nz"],
  KR: ["korea", "south korea"],
  NL: ["holland", "netherlands"],
};

/** Main zones of countries that have many, ranked first (in this order) among equal matches. */
const majorList = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Anchorage",
  "Pacific/Honolulu",
  "America/Toronto",
  "America/Vancouver",
  "America/Edmonton",
  "America/Winnipeg",
  "America/Halifax",
  "America/St_Johns",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Australia/Brisbane",
  "Australia/Perth",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Australia/Hobart",
  "America/Sao_Paulo",
  "America/Mexico_City",
  "Europe/Moscow",
  "Asia/Jakarta",
  "Europe/Lisbon",
  "Europe/Madrid",
  "Pacific/Auckland",
];
const majorRank = new Map(majorList.map((z, i) => [z, majorList.length - i]));

let regionNames: Intl.DisplayNames | null = null;
function countryName(cc: string) {
  try {
    regionNames ??= new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(cc) ?? cc;
  } catch {
    return cc;
  }
}

let cache: ZoneInfo[] | null = null;

/** Every IANA zone the browser supports, by current name, with country and continent. */
export function allZones(): ZoneInfo[] {
  if (cache) return cache;
  let ids: string[];
  try {
    ids = Intl.supportedValuesOf("timeZone");
  } catch {
    ids = Object.keys(zoneCountry);
  }
  const seen = new Set<string>();
  const list: ZoneInfo[] = [];
  for (const raw of [...ids, "UTC"]) {
    const id = currentZone(raw);
    if (seen.has(id)) continue;
    seen.add(id);
    list.push(zoneInfo(id));
  }
  list.sort((a, b) =>
    a.continent === b.continent
      ? a.country === b.country
        ? a.city.localeCompare(b.city)
        : a.country.localeCompare(b.country)
      : a.continent.localeCompare(b.continent),
  );
  cache = list;
  return list;
}

export function zoneInfo(zone: string): ZoneInfo {
  const id = currentZone(zone);
  const cc = zoneCountry[id] ?? zoneCountry[zone] ?? "";
  const city = id === "UTC" ? "UTC" : cityOf(id);
  const country = cc ? countryName(cc) : "Coordinated Universal Time";
  const continent = cc ? continentOf(id, cc) : "Other";
  const haystack = normalize(
    [city, country, cc, id.replace(/[/_]/g, " "), ...(countryAliases[cc] ?? [])].join(" "),
  );
  return { id, city, countryCode: cc, country, continent, haystack };
}

/**
 * Ranked search over city, country name, country code, zone name and common aliases
 * (UK, USA, UAE, India, ...). Every word in the query must match somewhere.
 */
export function searchZones(query: string, zones: ZoneInfo[] = allZones()): ZoneInfo[] {
  const q = normalize(query);
  if (!q) return zones;
  const words = q.split(" ");
  const scored: { z: ZoneInfo; score: number }[] = [];
  for (const z of zones) {
    if (!words.every((w) => z.haystack.includes(w))) continue;
    const city = normalize(z.city);
    const country = normalize(z.country);
    const code = z.countryCode.toLowerCase();
    const aliases = countryAliases[z.countryCode] ?? [];
    let score = 1;
    if (city === q) score = 100;
    else if (code === q || aliases.includes(q) || country === q) score = 90;
    else if (city.startsWith(q)) score = 80;
    else if (country.startsWith(q) || aliases.some((a) => a.startsWith(q))) score = 60;
    else if (city.includes(q)) score = 40;
    // In countries with many zones, list the main ones first (New York before Adak).
    const rank = majorRank.get(z.id);
    if (rank) score += 5 + rank / 100;
    scored.push({ z, score });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.z.city.localeCompare(b.z.city))
    .map((s) => s.z);
}

/** Display path, e.g. "Europe > Finland > Helsinki". */
export const zonePath = (z: ZoneInfo) =>
  z.countryCode ? `${z.continent} > ${z.country} > ${z.city}` : z.city;
