import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { BASE_URL } from "@/constants";
import { POST } from "@/constants/apiUrls";
import { logout, setCredentials } from "@/features/auth/authSlice";

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // IMPORTANT for refresh cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

export const baseQueryWithMutex = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await rawBaseQuery(args, api, extraOptions);

  // Auth Token expired
  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await rawBaseQuery(
          { url: "/users/refresh", method: POST },
          api,
          extraOptions
        );
        if (refreshResult?.data?.data?.accessToken) {
          api.dispatch(setCredentials({ token: refreshResult?.data?.data?.accessToken }));

          result = await rawBaseQuery(args, api, extraOptions);
          return result;
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      // Another refresh is in progress → wait for it to finish
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }
  return result;
};
