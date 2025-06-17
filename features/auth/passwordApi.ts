import { baseApi } from "@/services/api/baseApi";

export const passwordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (body) => ({
        url: "password",
        method: "PATCH",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useChangePasswordMutation, useResetPasswordMutation } =
  passwordApi;
