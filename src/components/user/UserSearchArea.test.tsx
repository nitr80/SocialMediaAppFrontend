import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSearchArea from "./UserSearchArea";
import { MemoryRouter } from "react-router-dom";
import type { User } from "../../types/user";

const mockSearchUsername = vi.fn();

vi.mock("../../hooks/useUsers", () => ({
  useUsers: () => ({
    searchUsername: mockSearchUsername,
  }),
}));

describe("UserSearchArea", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("searches empty query on initial render", async () => {
    mockSearchUsername.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <UserSearchArea />
      </MemoryRouter>,
    );

    await waitFor(
      () => {
        expect(mockSearchUsername).toHaveBeenCalledWith(
          "",
          expect.any(AbortSignal),
        );
      },
      { timeout: 1000 },
    );
  });

  it("debounces search and calls API after 300ms with abort signal", async () => {
    const user = userEvent.setup();
    mockSearchUsername.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <UserSearchArea />
      </MemoryRouter>,
    );

    await waitFor(() => expect(mockSearchUsername).toHaveBeenCalled(), {
      timeout: 1000,
    });
    mockSearchUsername.mockClear();

    const input = screen.getByLabelText("Search users");
    await user.type(input, "ali");

    expect(mockSearchUsername).not.toHaveBeenCalled();

    await waitFor(
      () => {
        expect(mockSearchUsername).toHaveBeenCalledWith(
          "ali",
          expect.any(AbortSignal),
        );
      },
      { timeout: 1000 },
    );
  });

  it("shows loading state while searching", async () => {
    const user = userEvent.setup();
    let resolvePromise!: (value: User[]) => void;
    mockSearchUsername.mockResolvedValueOnce([]);
    mockSearchUsername.mockReturnValueOnce(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    render(
      <MemoryRouter>
        <UserSearchArea />
      </MemoryRouter>,
    );

    await waitFor(() => expect(mockSearchUsername).toHaveBeenCalledTimes(1), {
      timeout: 1000,
    });

    const input = screen.getByLabelText("Search users");
    await user.type(input, "bob");

    expect(
      await screen.findByText("Loading...", {}, { timeout: 1000 }),
    ).toBeInTheDocument();

    resolvePromise([{ id: 2, username: "bob", email: "b@b.com" }]);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("ignores stale responses and only shows latest results", async () => {
    let resolveFirst!: (value: User[]) => void;
    let resolveSecond!: (value: User[]) => void;

    mockSearchUsername
      .mockResolvedValueOnce([])
      .mockReturnValueOnce(
        new Promise((resolve) => {
          resolveFirst = resolve;
        }),
      )
      .mockReturnValueOnce(
        new Promise((resolve) => {
          resolveSecond = resolve;
        }),
      );

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <UserSearchArea />
      </MemoryRouter>,
    );

    await waitFor(() => expect(mockSearchUsername).toHaveBeenCalledTimes(1), {
      timeout: 1000,
    });

    const input = screen.getByLabelText("Search users");
    await user.type(input, "a");
    await waitFor(() => expect(mockSearchUsername).toHaveBeenCalledTimes(2), {
      timeout: 1000,
    });

    await user.clear(input);
    await user.type(input, "ab");
    await waitFor(() => expect(mockSearchUsername).toHaveBeenCalledTimes(3), {
      timeout: 1000,
    });

    resolveSecond([{ id: 99, username: "abuser", email: "ab@b.com" }]);
    await waitFor(() => {
      expect(screen.getByText("abuser")).toBeInTheDocument();
    });

    resolveFirst([{ id: 1, username: "auser", email: "a@b.com" }]);
    await waitFor(() => {
      expect(screen.queryByText("auser")).not.toBeInTheDocument();
    });
  });
});
