import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithMutex } from "./basequery";

export const api = createApi({
  baseQuery: baseQueryWithMutex,
  reducerPath: "api",
  tagTypes: ["auth", "url"],
  endpoints: () => ({}),
});
