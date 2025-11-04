import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  initialState: {
    user: null,
    token: null,
  },
  name: "auth",
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
