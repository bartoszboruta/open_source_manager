import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GithubIssue } from "./types";

type IssueParams = { owner: string; repo: string; issueNumber: number };

export const githubApi = createApi({
  reducerPath: "github",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  endpoints: (builder) => ({
    fetchIssue: builder.query<GithubIssue, IssueParams>({
      query: ({ owner, repo, issueNumber }) =>
        `/repos/${owner}/${repo}/issues/${issueNumber}`,
    }),
  }),
});

export const { useFetchIssueQuery } = githubApi;
