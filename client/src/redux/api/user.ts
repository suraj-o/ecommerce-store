import { UserProfileResponse } from "@/types/redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi=createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER_URL}/api/v1`}),
    endpoints:(builder)=>({
        GetMyprofile:builder.query<UserProfileResponse,string>({
            query:(id)=>`/user/${id}`
        })
        

    })
})
export const {useGetMyprofileQuery}=userApi

