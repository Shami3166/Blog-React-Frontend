import type { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";


const selectCommentsState = (state: RootState) => state.comments.byPost;

export const selectCommentsByPostId = createSelector(
  [selectCommentsState, (_, postId: string) => postId],
  (byPost, postId) => byPost[postId] || []
);