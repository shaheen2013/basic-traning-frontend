import { baseApi } from "@/services/api/baseApi";

export const newsLetterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (body) => ({
        url: "newsletter",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = newsLetterApi;
