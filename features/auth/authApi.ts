// features/auth/authApi.ts

import { baseApi } from "@/services/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSession: builder.query({
      query: () => "auth/session",
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetSessionQuery } =
  authApi;
