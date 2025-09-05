
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { postApi } from "@/api/postApi";
import type { Post } from "./postsTypes";
import type { RootState } from "@/app/store";

interface PostsState {
  posts: Post[];
  current?: Post | null;
  loading: boolean;
  error: string | null;
  filters: {
    category?: string;
    search?: string;
  };
}

const initialState: PostsState = {
  posts: [],
  current: null,
  loading: false,
  error: null,
  filters: {},
};

export const fetchPosts = createAsyncThunk<Post[], void, { state: RootState }>(
  "posts/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { filters } = (getState() as RootState).posts;
      return await postApi.getAll(filters);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "Failed to fetch posts");
      }
      return rejectWithValue("Failed to fetch posts");
    }
  }
);

export const fetchPostById = createAsyncThunk<Post, string>(
  "posts/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await postApi.getById(id);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "Failed to fetch post");
      }
      return rejectWithValue("Failed to fetch post");
    }
  }
);

export const createPost = createAsyncThunk<Post, FormData>(
  "posts/create",
  async (payload, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (!token) {
      return rejectWithValue("Authentication token not found. Please log in.");
    }
    try {
      return await postApi.create(payload, token);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "Failed to create post");
      }
      return rejectWithValue("Failed to create post");
    }
  }
);

export const deletePost = createAsyncThunk<string, string, { state: RootState }>(
  "posts/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue("Authentication token not found. Please log in.");
      }

      await postApi.delete(id, token);
      return id;
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "Failed to delete post");
      }
      return rejectWithValue("Failed to delete post");
    }
  }
);


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<{ category?: string; search?: string }>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchPosts.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(fetchPosts.fulfilled, (s, a: PayloadAction<Post[]>) => {
        s.loading = false;
        s.posts = a.payload;
      })
      .addCase(fetchPosts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      .addCase(fetchPostById.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.current = null;
      })
      .addCase(fetchPostById.fulfilled, (s, a: PayloadAction<Post>) => {
        s.loading = false;
        s.current = a.payload;
      })
      .addCase(fetchPostById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      .addCase(createPost.fulfilled, (s, a: PayloadAction<Post>) => {
        s.posts.unshift(a.payload);
      })
      .addCase(deletePost.fulfilled, (s, a: PayloadAction<string>) => {
        s.posts = s.posts.filter((p) => p._id !== a.payload);
        s.current = null;
      });
  },
});

export const { setFilters, clearFilters } = postsSlice.actions;
export default postsSlice.reducer;
