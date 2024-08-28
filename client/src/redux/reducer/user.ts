import { UserProfileResponse } from "@/types/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState ={
    isLoading:false,
    user:"",
    isLogin:false,
    userData:{
        name:"",
        email:"",
        photo:"",
        gender:""
      }
}

export const userReducer=createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        isUserLogin:(state,action:PayloadAction<string>)=>{
            state.isLoading=true,
            state.user=action.payload
            state.isLogin=true
            state.isLoading=false
        },
        isUserData:(state,action:PayloadAction<UserProfileResponse["user"]>)=>{
            state.isLoading=true,
            state.userData!=action.payload
            state.isLoading=false
        }
    }
})

export const {isUserLogin,isUserData}= userReducer.actions