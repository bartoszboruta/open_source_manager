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
  endpoints: (builder) => ({
    fetchIssues: builder.query<Issue[], string>({
      query: (filters) => `issues/${filters}`,
    }),
    fetchIdeas: builder.query<Idea[], string>({
      query: (filters) => `ideas/${filters}`,
    }),
    fetchIssue: builder.query<Issue, number>({
      query: (id) => `issues/${id}`,
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
  useFetchIssuesQuery,
  useFetchIdeasQuery,
  useFetchIssueQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
  useLoginMutation,
  useRegisterMutation,
} = internalApi;
