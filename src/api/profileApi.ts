import axiosClient from "./axiosClient";

export const profileApi = {
  getProfile: async () => {
    const res = await axiosClient.get("/auth/me");
    return res.data;
  },

  updateProfile: async (data: FormData) => {
    const res = await axiosClient.put("/auth/me", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await axiosClient.post("/auth/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};

export default profileApi;
