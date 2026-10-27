import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { toTimeOrDate } from "./dateUtils";

describe("toTimeOrDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-27T15:42:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns time when date is today", () => {
    const today = "2026-10-27T10:15:00Z";
    const result = toTimeOrDate(today);
    expect(result).toBe("11:15 AM");
  });

  it("returns date when date is not today", () => {
    const past = "2026-10-25T10:15:00Z";
    const result = toTimeOrDate(past);
    expect(result).toBe("10/25/2026");
  });
});
