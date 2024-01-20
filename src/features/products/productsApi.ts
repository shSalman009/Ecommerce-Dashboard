import { BaseResponse } from "@/types/common";
import { ProductType } from "@/types/products";
import { apiSlice } from "../api/apiSlice";

interface MultipleProductResponse extends BaseResponse {
  payload: ProductType[];
}

interface SingleProductResponse extends BaseResponse {
  payload: ProductType;
}

interface DeleteProductResponse extends BaseResponse {
  payload: null;
}

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get products
    getProducts: builder.query<MultipleProductResponse, void>({
      query: () => "/products",
    }),

    // get product by slug
    getProductBySlug: builder.query<SingleProductResponse, string>({
      query: (slug) => `/products/${slug}`,
    }),

    // create product
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              productsApi.util.updateQueryData(
                "getProducts",
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

    // update product
    updateProduct: builder.mutation<
      SingleProductResponse,
      { slug: string; data: FormData }
    >({
      query: ({ slug, data }) => ({
        url: `/products/${slug}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ slug }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              productsApi.util.updateQueryData(
                "getProducts",
                undefined,
                (draft) => {
                  const index = draft?.payload?.findIndex(
                    (product) => product.slug === slug
                  );

                  if (index !== undefined && index !== -1) {
                    draft?.payload?.splice(index, 1, result.data.payload);
                  }
                }
              )
            );
            dispatch(
              productsApi.util.updateQueryData(
                "getProductBySlug",
                slug,
                (draft) => {
                  if (draft?.payload?.slug === slug) {
                    draft.payload = result.data.payload;
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

    // delete product
    deleteProduct: builder.mutation<DeleteProductResponse, { slug: string }>({
      query: ({ slug }) => ({
        url: `/products/${slug}`,
        method: "DELETE",
      }),

      async onQueryStarted({ slug }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              productsApi.util.updateQueryData(
                "getProducts",
                undefined,
                (draft) => {
                  const index = draft?.payload?.findIndex(
                    (product) => product.slug === slug
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
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
