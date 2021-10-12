import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLoginParams } from "./types";

export const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://osb-backend.herokuapp.com",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }: UserLoginParams) => ({
        url: `users/sign_in`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  reducer,
  endpoints: { login },
} = loginApi;
