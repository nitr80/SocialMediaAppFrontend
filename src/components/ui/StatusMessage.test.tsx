import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusMessage from "./StatusMessage";

describe("StatusMessage", () => {
  it("returns null when message is null", () => {
    const { container } = render(<StatusMessage message={null} type="error" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders with role alert for error", () => {
    render(<StatusMessage message="Something went wrong" type="error" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Something went wrong");
  });

  it("renders with role status for info", () => {
    render(<StatusMessage message="Saved" type="info" />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent("Saved");
  });
});
