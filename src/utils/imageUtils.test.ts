import { describe, expect, it } from "vitest";
import { getProfileImageUrl } from "./imageUtils";

describe("getProfileImageUrl", () => {
  it("returns default image when path is undefined", () => {
    expect(getProfileImageUrl(undefined)).toBe("/user.png");
  });

  it("returns default image when path is empty string", () => {
    expect(getProfileImageUrl("")).toBe("/user.png");
  });

  it("returns full url when path is provided", () => {
    const result = getProfileImageUrl("/images/avatar.png");
    expect(result).toContain("/images/avatar.png");
  });
});
