import {
  ALL_URL_FOR_USER,
  DELETE,
  DELETE_URL,
  GET,
  POST,
  REDIRECT_URL,
  SHORTEN_URL,
} from "@/constants";
import { api } from "@/store";

export const urlApi = api.injectEndpoints({
  endpoints: (builder) => ({
    shorten: builder.mutation({
      query: (url) => ({
        url: SHORTEN_URL,
        method: POST,
        body: url,
      }),
      invalidatesTags: ["url"],
    }),
    allUrls: builder.query({
      query: () => ({
        url: ALL_URL_FOR_USER,
        method: GET,
      }),
      providesTags: ["url"],
    }),
    redirectUrl: builder.mutation({
      query: (shortUrl) => ({
        url: REDIRECT_URL + shortUrl,
        method: GET,
      }),
      invalidatesTags: ["url"],
    }),
    deleteUrl: builder.mutation({
      query: (id) => ({
        url: DELETE_URL + id,
        method: DELETE,
      }),
      invalidatesTags: ["url"],
    }),
  }),
});

export const { useDeleteUrlMutation, useShortenMutation, useAllUrlsQuery, useRedirectUrlMutation } =
  urlApi;
