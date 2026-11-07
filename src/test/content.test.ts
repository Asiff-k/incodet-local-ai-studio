import { describe, expect, it } from "vitest";
import { caseStudies, featuredCaseStudies, showcase } from "@/content/caseStudies";
import { industries } from "@/content/industries";
import { faq } from "@/content/faq";
import { reviews } from "@/content/reviews";
import { plans } from "@/content/plans";

describe("content visibility", () => {
  it("hides todo case studies", () => {
    expect(caseStudies.map((c) => c.name)).not.toContain("Vyra Shops");
    expect(caseStudies.map((c) => c.name)).not.toContain("IncBlog");
  });
  it("features case studies in order", () => {
    expect(featuredCaseStudies.map((c) => c.name)).toEqual(["Western Cars Brighton", "Barkers Executive Cars", "GM Taxis Lewes", "HumanData Labs", "BRHEX Studio"]);
  });
  it("never links the staff registration tool", () => {
    const staff = caseStudies.find((c) => c.slug === "western-cars-staff-registration");
    expect(staff).toBeDefined();
    expect(staff?.liveUrl).toBeUndefined();
    expect(showcase.map((s) => s.key)).not.toContain("western-cars-staff-registration");
  });
  it("has 18 case studies and 11 industries", () => {
    expect(caseStudies).toHaveLength(18);
    expect(industries).toHaveLength(11);
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
