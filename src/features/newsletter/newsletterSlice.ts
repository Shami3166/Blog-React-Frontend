import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newsletterApi } from "@/api/newsletterApi";
import type { NewsletterState } from "./newsletterTypes";

const initialState: NewsletterState = {
  loading: false,
  success: null,
  error: null,
};

export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await newsletterApi.subscribe(email);
      return (data as { message: string }).message;
    }catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "subscription failed");
      }
      return rejectWithValue("subscription failed");
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = newsletterSlice.actions;
export default newsletterSlice.reducer;
