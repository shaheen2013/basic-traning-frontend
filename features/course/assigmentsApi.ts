import { baseApi } from "@/services/api/baseApi";

export const assignmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: ({ courseId, dayId }) => ({
        url: `courses/${courseId}/assignments/${dayId}/details`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAssignmentQuery } = assignmentApi;
