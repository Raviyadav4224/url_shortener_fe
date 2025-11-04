import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "@/features/auth/authSlice";

import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
  },
  middleware: (defautltMiddleware) => defautltMiddleware().concat(api.middleware),
});
