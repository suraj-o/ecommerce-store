import { CategoryResponse, GetLatestProductResponse } from "@/types/redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productApi=createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER_URL}/api/v1`}),
    endpoints:(builder)=>({
        GetLatestProduct:builder.query<GetLatestProductResponse,null>({
            query:()=>"/product/latest"
        }),
        GetProductCategory:builder.query<CategoryResponse,"">({
            query:()=>"/product/categories"
        })
        

    })
})

export const {useGetLatestProductQuery,useGetProductCategoryQuery}=productApi

