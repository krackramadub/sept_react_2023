import { configureStore } from "@reduxjs/toolkit";
import incrementReducer from "./reducers/incrementReducer/incrementReducer";
import postsReducer from "./reducers/postsReducer/postsReducer";

export const store = configureStore({
  reducer: {
    increment: incrementReducer,
    posts: postsReducer,
  },
});
