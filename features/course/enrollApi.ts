import { baseApi } from "@/services/api/baseApi";

export const courseEnrollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.mutation({
      query: ({ courseId }) => ({
        url: `courses/${courseId}/enroll`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetCourseMutation } = courseEnrollApi;
