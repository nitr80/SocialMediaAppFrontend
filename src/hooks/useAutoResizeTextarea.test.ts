import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAutoResizeTextarea } from "./useAutoResizeTextarea";
import type { ChangeEvent } from "react";

describe("useAutoResizeTextarea", () => {
  it("handleChange sets text and updates height", () => {
    const setText = vi.fn();
    const { result } = renderHook(() => useAutoResizeTextarea(setText));

    const textarea = {
      style: { height: "" },
      scrollHeight: 80,
    } as HTMLTextAreaElement;

    result.current.textareaRef.current = textarea;

    const event = {
      target: { value: "hello" },
    } as ChangeEvent<HTMLTextAreaElement>;

    result.current.handleChange(event);

    expect(setText).toHaveBeenCalledWith("hello");
    expect(textarea.style.height).toBe("60px");
  });
});
