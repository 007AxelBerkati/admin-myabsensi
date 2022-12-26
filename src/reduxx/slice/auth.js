import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  reducers: {
    LOGIN_SUCCESS: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { LOGIN_SUCCESS } = authSlice.actions;

export default authSlice.reducer;
