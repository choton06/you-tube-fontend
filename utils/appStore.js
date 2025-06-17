import { configureStore } from "@reduxjs/toolkit";
import seachReducer from "./searchSlice.js";
import likeReducer from "./LikeSlice"

const appStore = configureStore({
      reducer:{
        search : seachReducer,
        likes: likeReducer
      }
});

export default appStore;