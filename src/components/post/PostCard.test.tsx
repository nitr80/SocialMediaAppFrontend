import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostCard from "./PostCard";
import { MemoryRouter } from "react-router-dom";
import type { Post } from "../../types/post";

const mockLikePost = vi.fn();
const mockUnlikePost = vi.fn();

vi.mock("../../hooks/useLikes", () => ({
  useLikes: () => ({
    loading: false,
    likePost: mockLikePost,
    unlikePost: mockUnlikePost,
  }),
}));

describe("PostCard", () => {
  const post: Post = {
    id: 1,
    content: "Hello world",
    author: { id: 10, username: "author", email: "a@b.com" },
    likeCount: 5,
    commentCount: 2,
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates like count on successful like", async () => {
    const user = userEvent.setup();
    mockLikePost.mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <PostCard post={post} isLiked={false} />
      </MemoryRouter>,
    );

    expect(screen.getByText("5")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /like post/i }));
    expect(await screen.findByText("6")).toBeInTheDocument();
  });

  it("shows inline error on like failure", async () => {
    const user = userEvent.setup();
    mockLikePost.mockRejectedValueOnce({
      response: { data: { message: "Failed to like" } },
    });

    render(
      <MemoryRouter>
        <PostCard post={post} isLiked={false} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /like post/i }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Failed to like");
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
