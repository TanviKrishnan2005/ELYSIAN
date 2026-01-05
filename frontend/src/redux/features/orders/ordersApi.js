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

    // 💳 STRIPE PAYMENT INTENT
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

    // 👮 ADMIN — ALL ORDERS
    getAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),

    // 👮 ADMIN — SINGLE ORDER
    getOrderById: builder.query({
      query: (orderId) => `/${orderId}`,
    }),

    // 👮 ADMIN — UPDATE STATUS
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
  useGetOrderByIdQuery,     // ✅ NOW EXISTS
  useUpdateOrderStatusMutation,
} = ordersApi;

export default ordersApi;
