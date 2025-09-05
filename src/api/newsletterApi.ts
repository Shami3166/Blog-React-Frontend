import axiosClient from "./axiosClient";

export const newsletterApi = {
  subscribe: async (email: string) => {
    const res = await axiosClient.post("/newsletter/subscribe", { email });
    return res.data;
  },
  unsubscribe: async (email: string) => {
    const res = await axiosClient.post("/newsletter/unsubscribe", { email });
    return res.data;
  },
};
