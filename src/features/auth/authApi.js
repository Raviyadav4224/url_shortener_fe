import { toast } from "react-toastify";

import { LOGIN, LOGOUT, POST, REGISTER } from "@/constants";
import { UserSchema } from "@/schemas";
import { api } from "@/store";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (newUser) => {
        const result = UserSchema.safeParse(newUser);
        if (result?.error) {
          toast.error("Invalid User Data");
          throw new Error("Invalid user data");
        }
        return {
          url: LOGIN,
          method: POST,
          body: result?.data,
        };
      },
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
