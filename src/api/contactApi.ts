import type { ContactPayload, ContactResponse } from "@/features/contact/contactTypes";
import axiosClient from "./axiosClient";


const contactApi = {
  // User: Send a message
  sendMessage: async (data: ContactPayload): Promise<ContactResponse> => {
    const res = await axiosClient.post<ContactResponse>("/contacts", data);
    return res.data;
  },

  // Admin: Get all messages
  getMessages: async (): Promise<ContactResponse[]> => {
    const res = await axiosClient.get<ContactResponse[]>("/contacts");
    return res.data;
  },

  // Admin: Get single message by ID
  getMessageById: async (id: string): Promise<ContactResponse> => {
    const res = await axiosClient.get<ContactResponse>(`/contacts/${id}`);
    return res.data;
  },

  // Admin: Delete message
  deleteMessage: async (id: string): Promise<{ message: string }> => {
    const res = await axiosClient.delete<{ message: string }>(`/contacts/${id}`);
    return res.data;
  },
};

export default contactApi;
