import {createApi,fetchBaseQuery} from '@redux/toolkit/query/react'

const reviewApi = createApi({
    reducerPath:'reviewApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/reviews`,
        credential:'include',
    }),
    tageTypes:["Reviews"]
})