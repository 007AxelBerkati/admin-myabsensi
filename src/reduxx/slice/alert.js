import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alert: [],
  },
  reducers: {
    SET_ALERT: (state, action) => {
      state.alert = action.payload;
    },
    ADD_ALERT: (state, action) => {
      state.alert.push(action.payload);
    },
    REMOVE_ALERT: (state, action) => {
      state.alert.splice(action.payload, 1);
    },
    REMOVE_ALL_ALERTS: (state) => {
      state.alert = [];
    },
  },
});

export const { SET_ALERT, ADD_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } =
  alertSlice.actions;

export default alertSlice.reducer;
