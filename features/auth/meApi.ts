import { baseApi } from "@/services/api/baseApi";

export const meApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "user",
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "user/avatar",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = meApi;
