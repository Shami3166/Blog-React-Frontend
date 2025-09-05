import type { Post } from "@/features/posts/postsTypes";
import axiosClient from "./axiosClient";

export const postApi = {
  getAll: async (filters?: { category?: string; search?: string }): Promise<Post[]> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.search) params.append("search", filters.search);

    const res = await axiosClient.get<Post[]>(`/posts?${params.toString()}`);
    return res.data;
  },

  getById: async (id: string): Promise<Post> => {
    const res = await axiosClient.get<Post>(`/posts/${id}`);
    return res.data;
  },

  create: async (payload: FormData, token: string): Promise<Post> => {
    const res = await axiosClient.post<Post>("/posts", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  update: async (id: string, payload: FormData, token: string): Promise<Post> => {
    const res = await axiosClient.put<Post>(`/posts/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  uploadMedia: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("media", file);
    const res = await axiosClient.post<{ url: string }>(
      "/posts/upload-media",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data.url;
  },

  delete: async (id: string, token: string): Promise<void> => {
    await axiosClient.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
