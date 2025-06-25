import { baseApi } from "@/services/api/baseApi";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: ({ courseId, dayId }) => ({
        url: `courses/${courseId}/quizzes/${dayId}/details`,
        method: "GET",
      }),
    }),
    startQuiz: builder.mutation({
      query: ({ courseId, dayId }) => ({
        url: `courses/${courseId}/quizzes/${dayId}/start`,
        method: "POST",
      }),
    }),
    getQuizQuestions: builder.query({
      query: ({ courseId, dayId }) => ({
        url: `courses/${courseId}/test/${dayId}/questions`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetQuizQuery,
  useStartQuizMutation,
  useGetQuizQuestionsQuery,
} = quizApi;
