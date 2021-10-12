import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { UserLoginParams } from "./types";
// import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: "register",
  baseQuery: fetchBaseQuery({
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;

    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set("authorization", token);
    //   }

    //   return headers;
    // },
    baseUrl: "https://osb-backend.herokuapp.com",
  }),
  endpoints: (builder) => ({
    // login: builder.query<Issue[], UserLoginParams>({
    //   query: ({ email, password }: { email: string; password: string }) =>
    // `users/sign_in`,
    // }),
    register: builder.mutation({
      query: ({
        email,
        github_name,
        password,
        confirmed_password,
      }: {
        email: string;
        github_name: string;
        password: string;
        confirmed_password: string;
      }) => ({
        url: `users`,
        method: "POST", // When performing a mutation, you typically use a method of PATCH/PUT/POST/DELETE for REST endpoints
        body: {
          email,
          github_name,
          password,
          confirmed_password,
        }, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation } = loginApi;
