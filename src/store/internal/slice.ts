import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Issue, Idea } from "./types";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const internalApi = createApi({
  reducerPath: "internal",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set(
          "authorization",
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjM3MDU0NjM5LCJleHAiOjE2Mzc5MTg2MzksImp0aSI6IjY0YjJiOTVjLWViN2EtNDgxOS04YTQ3LTJiNzIxNTAzMTc3YyJ9.AsKXNTOUkvvA9T-s3aH_aNexmiuVv470ADA0XG28CRQ"
        );
      }

      return headers;
    },
    baseUrl: "https://osb-backend.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    fetchIssues: builder.query<Issue[], string>({
      query: (filters) => `issues/${filters}`,
    }),
    fetchIdeas: builder.query<Idea[], string>({
      query: (filters) => `ideas/${filters}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchIssuesQuery, useFetchIdeasQuery } = internalApi;
