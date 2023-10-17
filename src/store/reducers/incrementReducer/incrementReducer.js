import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  value: 1,
};
export const incrementSlice = createSlice({
  name: "increment",
  initialState,
  reducers: {
    increment: (state, actions) => {
      console.log("test incement", actions);
      state.value += actions.payload.value;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = incrementSlice.actions;
export default incrementSlice.reducer;
