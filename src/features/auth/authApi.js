import { LOGIN, LOGOUT, POST, REGISTER } from "@/constants";
import { api } from "@/store";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (newUser) => ({
        url: LOGIN,
        method: POST,
        body: JSON.stringify(newUser),
      }),
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: REGISTER,
        method: POST,
        body: newUser,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT,
        method: POST,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;
