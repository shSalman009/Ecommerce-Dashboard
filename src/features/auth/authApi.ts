import { AuthType } from "@/types/auth";
import { BaseResponse } from "@/types/common";
import { apiSlice } from "../api/apiSlice";
import { loggedIn, loggedOut } from "./authSlice";

export interface AuthCheck extends BaseResponse {
  payload?: AuthType;
}

export interface Login extends BaseResponse {
  payload?: AuthType;
}

export interface Logout extends BaseResponse {
  payload: null;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation<Login, { email: string; password: string }>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            const userData = result.data.payload;
            dispatch(loggedIn(userData));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // logout
    logout: builder.mutation<Logout, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            dispatch(loggedOut());
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // authCheck
    authCheck: builder.query<AuthCheck, void>({
      query: () => "auth/check",
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useAuthCheckQuery } =
  authApi;
