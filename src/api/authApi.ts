import type { AuthResponse, LoginPayload, RegisterPayload } from "@/features/auth/authTypes";
import axiosClient from "./axiosClient";

const authApi = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const res = await axiosClient.post<AuthResponse>("/auth/login", data);
    return res.data;
  },
  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const res = await axiosClient.post<AuthResponse>("/auth/register", data);
    return res.data;
  },
};

export default authApi;
