import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include", // ✅ REQUIRED
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    getAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),

    //  USER ORDERS
    getUserOrders: builder.query({
      query: () => "/my-orders",
      providesTags: ["Orders"],
    }),

    getUserOrderById: builder.query({
      query: (orderId) => `/my-orders/${orderId}`,
    }),

    getOrderById: builder.query({
      query: (id) => `/${id}`,
    }),

    createPaymentIntent: builder.mutation({
  query: (amount) => ({
    url: "/create-payment-intent",
    method: "POST",
    body: { amount },
  }),
}),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetUserOrdersQuery,
  useGetUserOrderByIdQuery,
  useGetOrderByIdQuery,
  useCreatePaymentIntentMutation,

} = ordersApi;

export default ordersApi;
