import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Profile, ProfileResponse } from "./profileTypes";
import profileApi from "@/api/profileApi";

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};


export const fetchProfile = createAsyncThunk<
  ProfileResponse,
  void,
  { rejectValue: string }
>("profile/fetchProfile", async (_: void, { rejectWithValue }) => {
  try {
    const data = await profileApi.getProfile();
    return data as ProfileResponse;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const response = (err as { response?: { data?: { message?: string } } }).response;
      return rejectWithValue(response?.data?.message || "Failed to load profile");
    }
    return rejectWithValue("Failed to load profile");
  }
});

export const updateProfile = createAsyncThunk<
  ProfileResponse,
  FormData,
  { rejectValue: string }
>("profile/updateProfile", async (formData, { rejectWithValue }) => {
  try {
    const data = await profileApi.updateProfile(formData);
    return data as ProfileResponse;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const response = (err as { response?: { data?: { message?: string } } }).response;
      return rejectWithValue(response?.data?.message || "Failed to update profile");
    }
    return rejectWithValue("Failed to update profile");
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<ProfileResponse>) => {
        state.loading = false;
        state.profile = action.payload.user;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Failed to load profile";
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<ProfileResponse>) => {
        state.loading = false;
        state.profile = action.payload.user; // ✅ updates Redux profile immediately
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Failed to update profile";
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
