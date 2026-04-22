import type { User } from "./user";

export interface Post {
    id: number;
    content: string;
    createdAt: string;
    likeCount: number;
    author: User;
}