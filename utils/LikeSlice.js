// src/redux/likeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedVideos: {}, // Store liked/unliked status for each video
  likeCount: {}, // Store like count for each video
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    likeVideo: (state, action) => {
      const { videoId } = action.payload;
      if (!state.likedVideos[videoId]) {
        state.likedVideos[videoId] = "liked";
        state.likeCount[videoId] = (state.likeCount[videoId] || 0) + 1;
      }
    },
    unlikeVideo: (state, action) => {
      const { videoId } = action.payload;
      if (state.likedVideos[videoId] === "liked") {
        state.likedVideos[videoId] = "unliked";
        state.likeCount[videoId] = Math.max((state.likeCount[videoId] || 1) - 1, 0);
      }
    },
  },
});

export const { likeVideo, unlikeVideo } = likeSlice.actions;
export default likeSlice.reducer;
