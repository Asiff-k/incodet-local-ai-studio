import { describe, expect, it } from "vitest";
import { allZones, currentZone, searchZones, zoneInfo, zonePath } from "@/lib/timezones";
import { canonicalZone } from "@/lib/booking";

const ids = (q: string) => searchZones(q).map((z) => z.id);

describe("time zone search", () => {
  it("covers every zone the runtime supports, by current name", () => {
    const zones = allZones();
    expect(zones.length).toBeGreaterThan(300);
    expect(zones.every((z) => z.city && z.continent)).toBe(true);
    expect(zones.map((z) => z.id)).toContain("Asia/Kolkata");
    expect(zones.map((z) => z.id)).not.toContain("Asia/Calcutta");
  });
  it("finds Finland and Helsinki", () => {
    expect(ids("Finland")).toEqual(["Europe/Helsinki"]);
    expect(ids("Helsinki")[0]).toBe("Europe/Helsinki");
  });
  it("finds Portugal and Lisbon", () => {
    expect(ids("Portugal")).toEqual(
      expect.arrayContaining(["Europe/Lisbon", "Atlantic/Azores", "Atlantic/Madeira"]),
    );
    expect(ids("Lisbon")[0]).toBe("Europe/Lisbon");
  });
  it("finds the UK by UK, England and the country code", () => {
    for (const q of ["UK", "England", "GB", "United Kingdom"])
      expect(ids(q)[0]).toBe("Europe/London");
  });
  it("finds US zones for USA, US and America", () => {
    for (const q of ["USA", "US", "America"]) {
      const top = ids(q).slice(0, 5);
      expect(top).toContain("America/New_York");
      expect(searchZones(q)[0]?.countryCode).toBe("US");
    }
  });
  it("finds India, Bangladesh, UAE and Australia", () => {
    // India has one zone; it comes first (Indianapolis and Indian Ocean islands rank lower).
    expect(ids("India")[0]).toBe("Asia/Kolkata");
    expect(searchZones("India")[1]?.countryCode).not.toBe("IN");
    expect(ids("Bangladesh")).toEqual(["Asia/Dhaka"]);
    expect(ids("UAE")).toEqual(["Asia/Dubai"]);
    expect(ids("Australia")).toEqual(
      expect.arrayContaining(["Australia/Perth", "Australia/Sydney"]),
    );
  });
  it("ignores accents and case", () => {
    expect(ids("sao paulo")[0]).toBe("America/Sao_Paulo");
    expect(ids("ZÜRICH")[0]).toBe("Europe/Zurich");
  });
  it("labels zones as Continent > Country > City", () => {
    expect(zonePath(zoneInfo("Europe/Helsinki"))).toBe("Europe > Finland > Helsinki");
    expect(zonePath(zoneInfo("America/Sao_Paulo"))).toBe("South America > Brazil > Sao Paulo");
  });
  it("still maps old names browsers report", () => {
    expect(currentZone("Asia/Calcutta")).toBe("Asia/Kolkata");
    expect(currentZone("Europe/Kiev")).toBe("Europe/Kyiv");
    expect(canonicalZone("Asia/Calcutta")).toBe("Asia/Kolkata");
    expect(zoneInfo("Asia/Calcutta").city).toBe("Kolkata");
  });
});
