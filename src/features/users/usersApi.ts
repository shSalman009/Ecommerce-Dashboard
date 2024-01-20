import { BaseResponse } from "@/types/common";
import { UserType } from "@/types/user";
import { apiSlice } from "../api/apiSlice";

interface GetUserResponse extends BaseResponse {
  payload?: UserType[];
}

interface UpdateUserResponse extends BaseResponse {
  payload: UserType;
}

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUserResponse, void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<
      UpdateUserResponse,
      { id: string; data: { name: string; email: string } }
    >({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success) {
            dispatch(
              usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
                const userIndex = draft?.payload?.findIndex(
                  (user) => user.id === id
                );

                if (userIndex !== undefined && userIndex !== -1) {
                  draft?.payload?.splice(userIndex, 1, {
                    ...result.data.payload,
                  });
                }
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = usersApi;
