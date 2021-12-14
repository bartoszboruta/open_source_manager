import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RegisterRequestInterface, RegisterResponse } from "./types";

export const registerApi = createApi({
  reducerPath: "register",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://osb-backend.herokuapp.com",
  }),
  endpoints: (builder) => ({
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

export const {
  useRegisterMutation,
  reducer,
  endpoints: { register },
} = registerApi;
