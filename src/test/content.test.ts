import { describe, expect, it } from "vitest";
import { caseStudies, featuredCaseStudies } from "@/content/caseStudies";
import { faq } from "@/content/faq";
import { reviews } from "@/content/reviews";
import { plans } from "@/content/plans";

describe("content visibility", () => {
  it("hides todo case studies", () => {
    expect(caseStudies.map((c) => c.name)).not.toContain("Vyra Shops");
    expect(caseStudies.map((c) => c.name)).not.toContain("IncBlog");
  });
  it("features case studies in order", () => {
    expect(featuredCaseStudies.map((c) => c.name)).toEqual(["Western Cars", "Barkers Executive Cars", "GM Taxis Lewes", "HumanData Labs", "BRHEX Studio"]);
  });
  it("never links the staff registration tool", () => {
    const wc = caseStudies.find((c) => c.slug === "western-cars");
    expect(wc?.includes?.find((i) => i.label === "Staff registration tool")?.url).toBeUndefined();
  });
  it("hides todo FAQ items", () => {
    expect(faq).toHaveLength(8);
  });
  it("has no reviews", () => {
    expect(reviews).toHaveLength(0);
  });
  it("features Growth", () => {
    expect(plans.find((p) => p.featured)?.name).toBe("Growth");
  });
});
