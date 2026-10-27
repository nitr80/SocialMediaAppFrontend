import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthButton from "./AuthButton";

describe("AuthButton", () => {
  it("renders button text", () => {
    render(<AuthButton buttonText="Login" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<AuthButton buttonText="Register" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Register" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <AuthButton buttonText="Submit" onClick={() => {}} disabled={true} />,
    );
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });
});
