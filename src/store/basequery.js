import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { BASE_URL } from "@/constants";

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
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
  const release = await mutex.acquire();
  try {
    const result = await rawBaseQuery(args, api, extraOptions);
    return result;
  } finally {
    release();
  }
};
