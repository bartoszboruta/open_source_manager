import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { saveToken } from "../../utils";

import { LoginRequestParams, LoginResponse } from "./types";

export const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://osb-backend.herokuapp.com",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequestParams>({
      query: ({ email, password }) => ({
        url: `users/sign_in`,
        method: "POST",
        body: {
          email,
          password,
        },
        responseHandler: async (response) => {
          console.log("response", response.headers.map.authorization);
          await saveToken(response.headers.map.authorization);
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
