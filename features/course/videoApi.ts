import { baseApi } from "@/services/api/baseApi";

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesLessons: builder.query({
      query: ({ courseId, topicId }) => ({
        url: `courses/${courseId}/topics/${topicId}/details`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCoursesLessonsQuery } = videoApi;
