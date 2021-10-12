import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Issue } from "./types";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const internalApi = createApi({
  reducerPath: "internal",

  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
    baseUrl: "https://osb-backend.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    fetchIssues: builder.query<Issue[], string>({
      query: (filters) => `issues/${filters}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchIssuesQuery } = internalApi;
