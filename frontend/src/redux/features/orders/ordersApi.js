import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({

    // 🛒 CREATE ORDER
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    // 💳 CREATE STRIPE PAYMENT INTENT  ✅ REQUIRED
    createPaymentIntent: builder.mutation({
      query: ({ amount }) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: { amount },
      }),
    }),

    // 👤 USER ORDERS
    getUserOrders: builder.query({
      query: () => "/my-orders",
      providesTags: ["Orders"],
    }),

    // 👮 ADMIN
    getAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (orderId) => `/${orderId}`,
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation, 
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;

export default ordersApi;
