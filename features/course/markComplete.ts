import { baseApi } from "@/services/api/baseApi";

export const markCompleteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markComplete: builder.mutation({
      query: ({ courseId, topicId }) => ({
        url: `courses/${courseId}/topics/${topicId}/complete`,
        method: "POST",
      }),
    }),
  }),
});

export const { useMarkCompleteMutation } = markCompleteApi;
