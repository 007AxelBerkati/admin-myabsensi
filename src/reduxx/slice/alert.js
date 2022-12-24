import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alert: null,
  },
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
