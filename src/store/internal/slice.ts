import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Issue,
  Idea,
  LoginResponse,
  LoginRequestParams,
  RegisterResponse,
  RegisterRequestInterface,
} from "./types";
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
  tagTypes: ["Issue", "Idea"],
  endpoints: (builder) => ({
    assignUserToIssue: builder.mutation<
      Issue,
      { issueId: number; userId: number }
    >({
      invalidatesTags: ["Issue"],
      query: ({ issueId, userId }) => ({
        url: `/user_issues`,
        method: "POST",
        body: {
          user_issue: {
            user_id: userId,
            issue_id: issueId,
          },
        },
      }),
    }),
    assignUserToIdea: builder.mutation<
      Issue,
      { ideaId: number; userId: number }
    >({
      invalidatesTags: ["Idea"],
      query: ({ ideaId, userId }) => ({
        url: `/user_ideas`,
        method: "POST",
        body: {
          user_idea: {
            user_id: userId,
            idea_id: ideaId,
          },
        },
      }),
    }),
    fetchIssues: builder.query<Issue[], string>({
      query: (filters) => `issues${filters}`,
      providesTags: ["Issue"],
    }),
    fetchIssuesByUser: builder.query<Issue[], number>({
      query: (id) => `issues?q[creator_id_in][]=${id}`,
    }),
    fetchIssuesAssignedTo: builder.query<Issue[], number>({
      query: (id) => `issues?q[users_id_in][]=${id}`,
    }),
    fetchIdeas: builder.query<Idea[], string>({
      query: (filters) => `ideas${filters}`,
      providesTags: ["Idea"],
    }),
    fetchIssue: builder.query<Issue, number>({
      query: (id) => `issues/${id}`,
      providesTags: ["Issue"],
    }),
    fetchIdea: builder.query<Idea, number>({
      query: (id) => `ideas/${id}`,
      providesTags: ["Idea"],
    }),
    createIssue: builder.mutation<Issue, Partial<Issue>>({
      query: (body) => ({
        url: `issues/`,
        method: "POST",
        body,
      }),
    }),
    updateIssue: builder.mutation<Issue, Partial<Issue>>({
      query: ({ id, ...body }) => ({
        url: `issues/${id}`,
        method: "PUT",
        body,
      }),
    }),
    createIdea: builder.mutation<Idea, Partial<Idea>>({
      query: (body) => ({
        url: `ideas/`,
        method: "POST",
        body,
      }),
    }),
    updateIdea: builder.mutation<Idea, Partial<Idea>>({
      query: ({ id, ...body }) => ({
        url: `ideas/${id}`,
        method: "PUT",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequestParams>({
      query: ({ email, password }) => ({
        url: `users/sign_in`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email,
          password,
        },
        responseHandler: async (response: any) => {
          // todo type
          const user = await response.json();

          return {
            token: response.headers.map.authorization,
            user,
          };
        },
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequestInterface>({
      query: ({ email, github_name, password, confirmed_password }) => ({
        url: `users`,
        method: "POST",
        body: {
          email,
          github_name,
          password,
          confirmed_password,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAssignUserToIssueMutation,
  useAssignUserToIdeaMutation,
  useFetchIssuesQuery,
  useFetchIdeasQuery,
  useFetchIssueQuery,
  useFetchIssuesByUserQuery,
  useFetchIssuesAssignedToQuery,
  useFetchIdeaQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
  useLoginMutation,
  useRegisterMutation,
  useCreateIdeaMutation,
  useUpdateIdeaMutation,
} = internalApi;
