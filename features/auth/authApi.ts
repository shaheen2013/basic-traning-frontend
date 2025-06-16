// features/auth/authApi.ts

import { baseApi } from "@/services/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSession: builder.query({
      query: () => "auth/session",
      providesTags: ["Me"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
      }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const { useLoginMutation, useGetSessionQuery, useLogoutMutation } =
  authApi;
