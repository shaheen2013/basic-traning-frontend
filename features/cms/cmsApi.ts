import { baseApi } from "@/services/api/baseApi";

export const cmsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomePageContent: builder.query({
      query: () => "home-page-contents",
    }),
    getCourseInfoContent: builder.query({
      query: () => "course-info-page-contents",
    }),
  }),
});

export const { useGetHomePageContentQuery, useGetCourseInfoContentQuery } =
  cmsApi;
