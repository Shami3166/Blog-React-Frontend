import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "./commentTypes";
import { commentApi } from "@/api/commentApi";

interface CommentsState {
  byPost: Record<string, Comment[]>;
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  byPost: {},
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk<{ postId: string; comments: Comment[] }, string>(
  "comments/fetch",
  async (postId, { rejectWithValue }) => {
    try {
      const comments = await commentApi.list(postId);
      return { postId, comments };
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "Failed to fetch comments");
      }
      return rejectWithValue("Failed to fetch comments");
    }
  }
);

// ✅ Corrected addComment thunk
export const addComment = createAsyncThunk<Comment, { postId: string; text: string }>(
  "comments/add",
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const comment = await commentApi.add(postId, text);
      return comment; // Return the new comment directly
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "Failed to add comment");
      }
      return rejectWithValue("Failed to add comment");
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchComments.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchComments.fulfilled, (s, a: PayloadAction<{ postId: string; comments: Comment[] }>) => {
        s.loading = false; s.byPost[a.payload.postId] = a.payload.comments;
     })
     .addCase(fetchComments.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

     // ✅ Handle addComment.fulfilled to update the state
     .addCase(addComment.fulfilled, (s, a: PayloadAction<Comment>) => {
        const postId = a.payload.post; // Get postId from the returned comment
        const arr = s.byPost[postId] || [];
        arr.unshift(a.payload);
        s.byPost[postId] = arr;
     });
  },
});

export default commentsSlice.reducer;