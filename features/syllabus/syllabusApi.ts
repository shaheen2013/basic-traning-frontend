import { baseApi } from "@/services/api/baseApi";

export const syllabusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSyllabus: builder.query({
      query: () => "syllabuses/1/",
    }),
  }),
});

export const { useGetSyllabusQuery } = syllabusApi;
