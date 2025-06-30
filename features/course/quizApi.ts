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
    submitQuizAnswer: builder.mutation({
      query: ({ course_id, test_id, payload }) => ({
        url: `courses/${course_id}/test/${test_id}/submit-answer`,
        method: "POST",
        body: payload,
      }),
    }),
    quizComplete: builder.mutation({
      query: ({ course_id, test_id }) => ({
        url: `courses/${course_id}/test/${test_id}/complete`,
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const {
  useGetQuizQuery,
  useStartQuizMutation,
  useGetQuizQuestionsQuery,
  useSubmitQuizAnswerMutation,
  useQuizCompleteMutation,
} = quizApi;
