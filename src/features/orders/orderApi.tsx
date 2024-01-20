import { BaseResponse } from "@/types/common";
import { OrderType } from "@/types/orders";
import { apiSlice } from "../api/apiSlice";

interface MultipleOrderResponse extends BaseResponse {
  payload: OrderType[];
}

interface SingleOrderResponse extends BaseResponse {
  payload: OrderType;
}

interface DeleteOrderResponse extends BaseResponse {
  payload: null;
}

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all orders
    getOrders: builder.query<MultipleOrderResponse, void>({
      query: () => `orders`,
    }),

    // get single order by id
    getOrder: builder.query<SingleOrderResponse, string>({
      query: (id) => `orders/${id}`,
    }),

    // delete order by id
    deleteOrder: builder.mutation<DeleteOrderResponse, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              orderApi.util.updateQueryData("getOrders", undefined, (draft) => {
                const index = draft?.payload?.findIndex(
                  (order) => order.id === id
                );

                if (index !== undefined && index !== -1) {
                  draft?.payload?.splice(index, 1);
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

export const { useGetOrdersQuery, useGetOrderQuery, useDeleteOrderMutation } =
  orderApi;
