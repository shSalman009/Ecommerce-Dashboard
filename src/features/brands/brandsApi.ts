import { BrandType } from "@/types/brands";
import { BaseResponse } from "@/types/common";
import { apiSlice } from "../api/apiSlice";

interface GetBrandsResponse extends BaseResponse {
  payload: BrandType[];
}

interface OriginalResponse extends BaseResponse {
  payload: BrandType;
}

export const brandsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<GetBrandsResponse, void>({
      query: () => `/brands`,
    }),

    createBrand: builder.mutation<OriginalResponse, { name: string }>({
      query: (data) => ({
        url: `/brands`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              brandsApi.util.updateQueryData(
                "getBrands",
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

    updateBrand: builder.mutation<
      OriginalResponse,
      { id: string; name: string }
    >({
      query: ({ id, name }) => ({
        url: `/brands/${id}`,
        method: "PATCH",
        body: { name },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              brandsApi.util.updateQueryData(
                "getBrands",
                undefined,
                (draft) => {
                  const index = draft?.payload?.findIndex(
                    (brand) => brand.id === id
                  );

                  if (index !== undefined && index !== -1) {
                    draft!.payload![index] = result.data.payload;
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

    deleteBrand: builder.mutation<OriginalResponse, string>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              brandsApi.util.updateQueryData(
                "getBrands",
                undefined,
                (draft) => {
                  const index = draft?.payload?.findIndex(
                    (brand) => brand.id === id
                  );

                  if (index !== undefined && index !== -1) {
                    draft?.payload?.splice(index, 1);
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
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
