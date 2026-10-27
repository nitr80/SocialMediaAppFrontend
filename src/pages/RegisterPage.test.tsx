import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "./RegisterPage";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();
const mockRegister = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    register: mockRegister,
  }),
}));

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows inline password error and does not call register", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Username:"), "test");
    await user.type(screen.getByLabelText("Email:"), "test@example.com");
    await user.type(screen.getByLabelText("Password:"), "pass");
    await user.type(screen.getByLabelText("Password (Again):"), "pass");
    await user.click(screen.getByRole("button", { name: "Register" }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows inline email error and does not call register", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Username:"), "test");
    await user.type(screen.getByLabelText("Email:"), "bademail");
    await user.type(screen.getByLabelText("Password:"), "Password123!");
    await user.type(screen.getByLabelText("Password (Again):"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Register" }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows inline form error on api failure", async () => {
    const user = userEvent.setup();
    mockRegister.mockRejectedValueOnce({
      response: { data: { message: "Username taken" } },
    });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Username:"), "test");
    await user.type(screen.getByLabelText("Email:"), "test@example.com");
    await user.type(screen.getByLabelText("Password:"), "Password123!");
    await user.type(screen.getByLabelText("Password (Again):"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Register" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).not.toBeDisabled();
  });
});
