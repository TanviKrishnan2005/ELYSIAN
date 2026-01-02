import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include", // IMPORTANT
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({

    // ADMIN → GET ALL ORDERS
    getAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),

    // ADMIN → UPDATE ORDER STATUS
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;

export default ordersApi;
