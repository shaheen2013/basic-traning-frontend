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
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "forgot-password",
        method: "POST",
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

export const {
  useChangePasswordMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = passwordApi;
