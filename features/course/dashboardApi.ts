import { baseApi } from "@/services/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseSummary: builder.query({
      query: () => ({
        url: `courses/details`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCourseSummaryQuery } = dashboardApi;
