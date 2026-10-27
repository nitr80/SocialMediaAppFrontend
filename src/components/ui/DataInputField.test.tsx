import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataInputField from "./DataInputField";

describe("DataInputField", () => {
  it("associates label with input using unique id", () => {
    const setValue = vi.fn();
    render(<DataInputField label="Username:" value="" setValue={setValue} />);
    const input = screen.getByLabelText("Username:");
    expect(input).toBeInTheDocument();
  });

  it("passes type and autoComplete", () => {
    const setValue = vi.fn();
    render(
      <DataInputField
        label="Password:"
        value=""
        setValue={setValue}
        type="password"
        autoComplete="current-password"
      />,
    );
    const input = screen.getByLabelText("Password:") as HTMLInputElement;
    expect(input.type).toBe("password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
  });

  it("calls setValue on change", async () => {
    const user = userEvent.setup();
    const setValue = vi.fn();
    render(<DataInputField label="Email:" value="" setValue={setValue} />);
    const input = screen.getByLabelText("Email:");
    await user.type(input, "test@example.com");
    expect(setValue).toHaveBeenCalled();
  });
});
