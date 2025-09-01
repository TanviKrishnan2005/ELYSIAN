import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"

const authApi = createApi({
    reducerPath:'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl :'http://localhost:5000/api/auth',
        credentials:"include",
        


    })
})