import { CategoryType } from "@/types/category";
import { BaseResponse } from "@/types/common";
import { apiSlice } from "../api/apiSlice";

export interface GetCategoriesResponse extends BaseResponse {
  payload: CategoryType[];
}

interface OriginalResponse extends BaseResponse {
  payload: CategoryType;
}

interface DeleteCategoryResponse extends BaseResponse {
  payload?: null;
}

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => `/categories`,
    }),

    addCategory: builder.mutation<OriginalResponse, FormData>({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              categoryApi.util.updateQueryData(
                "getCategories",
                undefined,
                (draft) => {
                  draft?.payload?.push(result.data.payload);
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateCategory: builder.mutation<
      OriginalResponse,
      {
        slug: string;
        data: FormData;
      }
    >({
      query: ({ slug, data }) => ({
        url: `/categories/${slug}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ slug }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              categoryApi.util.updateQueryData(
                "getCategories",
                undefined,
                (draft) => {
                  const categoryIndex = draft?.payload?.findIndex(
                    (category) => category.slug === slug
                  );

                  if (categoryIndex !== undefined && categoryIndex !== -1) {
                    draft?.payload?.splice(
                      categoryIndex,
                      1,
                      result.data.payload
                    );
                  }
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteCategory: builder.mutation<DeleteCategoryResponse, { slug: string }>({
      query: ({ slug }) => ({
        url: `/categories/${slug}`,
        method: "DELETE",
      }),
      async onQueryStarted({ slug }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              categoryApi.util.updateQueryData(
                "getCategories",
                undefined,
                (draft) => {
                  const categoryIndex = draft?.payload?.findIndex(
                    (category) => category.slug === slug
                  );

                  if (categoryIndex !== undefined && categoryIndex !== -1) {
                    draft?.payload?.splice(categoryIndex, 1);
                  }
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
