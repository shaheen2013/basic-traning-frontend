/* eslint-disable @typescript-eslint/no-explicit-any */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearToken, getToken } from "../storage/authStorage";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",

  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("Accept", "application/json");
    return headers;
  },
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const allowedPaths = ["/login", "/home", "/course-info", "/"];
    const currentPath = window.location.pathname;

    // Check if current path is NOT in allowedPaths (exact match)
    const shouldRedirect = !allowedPaths.some((path) =>
      path === "/" ? currentPath === "/" : currentPath.startsWith(path)
    );

    if (shouldRedirect) {
      toast.error("Session expired. Please login again.");
      clearToken();
      window.location.href = "/login";
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Me"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
