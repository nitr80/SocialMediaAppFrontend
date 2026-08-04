import type { User } from "./user";

export interface Comment{
    id: number;
    content: string;
    createdAt: string;
    likeCount: number;
    postId: number;
    author: User;
}