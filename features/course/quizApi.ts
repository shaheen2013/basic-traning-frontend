import { baseApi } from "@/services/api/baseApi";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: ({ courseId, dayId }) => ({
        url: `courses/${courseId}/quizzes/${dayId}/details`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetQuizQuery } = quizApi;
