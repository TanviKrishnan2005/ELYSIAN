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
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;

export default ordersApi;
