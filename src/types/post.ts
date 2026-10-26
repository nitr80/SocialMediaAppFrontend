import type { User } from "./user";

export interface Post {
  id: number;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  author: User;
}
