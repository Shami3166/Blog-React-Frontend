
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import authApi from "@/api/authApi";
import type { AuthResponse, LoginPayload, RegisterPayload } from "./authTypes";
import storage from "@/utils/storage";

export interface User {
  name: string;
  role?: string;
  _id?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: storage.getUser(),
  token: storage.getToken(),
  loading: false,
  error: null,
  role: storage.getUser()?.role || null,
};

export const loginUser = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.login(credentials);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "invalid credentials");
      }
      return rejectWithValue("invalid credentials");
    }
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      return await authApi.register(data);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        return rejectWithValue(response?.data?.message || "user already register");
      }
      return rejectWithValue("user already register");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      storage.clear();
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      storage.setUser(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role ?? null;

        // persist to localStorage
        storage.setToken(action.payload.token);
        storage.setUser(action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;