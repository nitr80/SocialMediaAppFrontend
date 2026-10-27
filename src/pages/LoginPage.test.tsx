import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./LoginPage";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navigates to /feed on successful login", async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Username:"), "testuser");
    await user.type(screen.getByLabelText("Password:"), "password123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Login" })).toBeDisabled();
      expect(mockLogin).toHaveBeenCalledWith("testuser", "password123");
      expect(mockNavigate).toHaveBeenCalledWith("/feed", { replace: true });
    });
  });

  it("shows inline error on login failure and keeps button enabled after failure", async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Username:"), "bad");
    await user.type(screen.getByLabelText("Password:"), "wrong");
    await user.click(screen.getByRole("button", { name: "Login" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).not.toBeDisabled();
  });
});
