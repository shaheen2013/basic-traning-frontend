import { baseApi } from "@/services/api/baseApi";

export const meApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "user",
      providesTags: ["Me"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "user",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Me"],
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "user/avatar",
        method: "POST",
        body: { ...formData, _method: "PATCH" },
      }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = meApi;
