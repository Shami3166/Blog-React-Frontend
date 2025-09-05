import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import postsReducer from "@/features/posts/postsSlice";
import commentsReducer from "@/features/comments/commentSlice";
import profileReducer from "@/features/profile/profileSlice";
import contactReducer from "@/features/contact/contactSlice";
import newsletterReducer from "@/features/newsletter/newsletterSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    profile: profileReducer, // ✅ register profile reducer
    contact: contactReducer, // ✅ register contact reducer
    newsletter: newsletterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
