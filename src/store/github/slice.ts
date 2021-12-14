import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GithubIssue, GitHubProfile } from "./types";

type IssueParams = { owner: string; repo: string; issueNumber: number };
type ProfileParams = { name: string };

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
    fetchProfile: builder.query<GitHubProfile, ProfileParams>({
      query: ({ name }) => ({
        url: "user",
        method: "GET",
        body: { name },
      }),
    }),
  }),
});

export const { useFetchIssueQuery } = githubApi;
