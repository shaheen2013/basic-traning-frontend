/* eslint-disable @typescript-eslint/no-explicit-any */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Session } from "next-auth";

// Define the shape of your session with the access token
interface AppSession extends Session {
  accessToken?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  prepareHeaders: async (headers) => {
    try {
      // Dynamically import getSession to avoid SSR issues
      const { getSession } = await import("next-auth/react");
      const session = (await getSession()) as AppSession | null;

      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }

      // Set common headers
      headers.set("Accept", "application/json");
    } catch (error) {
      console.error("Error preparing headers:", error);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Me"],
  // refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
