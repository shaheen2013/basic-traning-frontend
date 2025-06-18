import { baseApi } from "@/services/api/baseApi";

export const modulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query({
      query: ({ id }) => ({
        url: `courses/${id}/modules`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetModulesQuery } = modulesApi;
