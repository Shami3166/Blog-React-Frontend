import type { Comment } from "@/features/comments/commentTypes";
import axiosClient from "./axiosClient";

export const commentApi = {
  list: async (postId: string): Promise<Comment[]> => {
    const res = await axiosClient.get<Comment[]>(`/posts/${postId}/comments`);
    return res.data;
  },
  add: async (postId: string, text: string): Promise<Comment> => {
    const res = await axiosClient.post<Comment>(`/posts/${postId}/comments`, { text });
    return res.data;
  },
};