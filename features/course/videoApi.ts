import { baseApi } from "@/services/api/baseApi";

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesVideo: builder.query({
      query: ({ courseId, topicId }) => ({
        url: `courses/${courseId}/topics/${topicId}/details`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCoursesVideoQuery } = videoApi;
