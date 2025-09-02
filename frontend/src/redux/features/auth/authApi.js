import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`, // ✅ clean URL
    credentials: "include",
    prepareHeaders: (headers) => {
      // optional: set JSON header
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register", // ✅ correctly appends
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login", // ✅ correctly appends
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

console.log("Base URL:", `${getBaseUrl()}/api/auth`);


export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export default authApi;
