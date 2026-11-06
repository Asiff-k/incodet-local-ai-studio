import { describe, expect, it } from "vitest";
import { caseStudies } from "@/content/caseStudies";
import { faq } from "@/content/faq";
import { reviews } from "@/content/reviews";
import { plans } from "@/content/plans";

describe("content visibility", () => {
  it("hides todo case studies", () => {
    expect(caseStudies.map((c) => c.name)).toEqual(["BRHEX Studio", "Bloom Studio"]);
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
