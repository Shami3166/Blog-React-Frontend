import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import contactApi from "@/api/contactApi";
import type { ContactPayload, ContactResponse } from "./contactTypes";

interface ContactState {
  messages: ContactResponse[];
  selectedMessage: ContactResponse | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactState = {
  messages: [],
  selectedMessage: null,
  loading: false,
  error: null,
  success: false,
};

export const sendMessage = createAsyncThunk<
  ContactResponse,
  ContactPayload,
  { rejectValue: string }
>("contact/sendMessage", async (data, { rejectWithValue }) => {
  try {
    return await contactApi.sendMessage(data);
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const response = (err as { response?: { data?: { message?: string } } }).response;
      return rejectWithValue(response?.data?.message || "Failed to send message");
    }
    return rejectWithValue("Failed to send message");
  }
});

export const getMessages = createAsyncThunk<
  ContactResponse[],
  void,
  { rejectValue: string }
>("contact/getMessages", async (_, { rejectWithValue }) => {
  try {
    return await contactApi.getMessages();
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const response = (err as { response?: { data?: { message?: string } } }).response;
      return rejectWithValue(response?.data?.message || "Failed to fetch messages");
    }
    return rejectWithValue("Failed to fetch messages");
  }
});

export const getMessageById = createAsyncThunk<
  ContactResponse,
  string,
  { rejectValue: string }
>("contact/getMessageById", async (id, { rejectWithValue }) => {
  try {
    return await contactApi.getMessageById(id);
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const response = (err as { response?: { data?: { message?: string } } }).response;
      return rejectWithValue(response?.data?.message || "message not found");
    }
    return rejectWithValue("message not found");
  }
});

export const deleteMessage = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("contact/deleteMessage", async (id, { rejectWithValue }) => {
  try {
    await contactApi.deleteMessage(id);
    return id;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const response = (err as { response?: { data?: { message?: string } } }).response;
      return rejectWithValue(response?.data?.message || "Failed to delete message");
    }
    return rejectWithValue("Failed to delete message");
  }
});

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContact: (state) => {
      state.success = false;
      state.error = null;
      state.selectedMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // sendMessage
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<ContactResponse>) => {
        state.loading = false;
        state.success = true;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send message";
      })

      // getMessages
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action: PayloadAction<ContactResponse[]>) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch messages";
      })

      // getMessageById
      .addCase(getMessageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessageById.fulfilled, (state, action: PayloadAction<ContactResponse>) => {
        state.loading = false;
        state.selectedMessage = action.payload;
      })
      .addCase(getMessageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Message not found";
      })

      // deleteMessage
      .addCase(deleteMessage.fulfilled, (state, action: PayloadAction<string>) => {
        state.messages = state.messages.filter((m) => m._id !== action.payload);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete message";
      });
  },
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;
