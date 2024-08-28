import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType{
    count:number,
    isMatch:boolean
    products:{
        _id:string
        name:string,
        photo:string,
        price:number,
        quantity:number,
        stock:number,
        category:string
    }[]
}

export interface PayloadActionType{
    _id:string
    name:string,
    photo:string,
    price:number,
    quantity:number,
    category:string
    stock:number,
}

const initialState:InitialStateType ={
   isMatch:false,
   count:0,
   products:[{
    _id:"",
    name:"",
    price:0,
    quantity:0,
    photo:"",
    category:"",
    stock:0
   }]
}

export const cartReducer=createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
        addCart:(state,action:PayloadAction<PayloadActionType>)=>{
            const item =action.payload;
            const itemExist= state.products.find((i)=>i._id === item._id)
    
            if(itemExist){
                state.products.forEach((i)=>{
                    if(i._id === item._id){
                        i.quantity += 1;
                    }
                })
                
            }
            else{
                state.products.push(item)
                state.count++
            }},
            removeCart:(state,action:PayloadAction<string>)=>{
                state.products= state.products.filter((i)=>i._id !== action.payload.toLowerCase())  
                state.count-=1   
            },
            quantityUpdate:(state,action:PayloadAction<{_id:string,method:"dec"|"inc"}>)=>{
                const item =action.payload;
                const itemExist= state.products.find((i)=>i._id === item._id)

                if(itemExist){
                    state.products.forEach((i)=>{
                        if(i._id === item._id){
                            switch (action.payload.method) {
                                case "inc":
                                    i.quantity += 1;
                                    break;
                                case "dec":
                                    i.quantity -= i.quantity==0?0:1;
                                    break;
                            }
                        }
                    })
                    
                }
            },
            cleanCart:(state)=>{
                state.count=0
                state.products=[{
                    _id:"",
                    name:"",
                    price:0,
                    quantity:0,
                    photo:"",
                    category:"",
                    stock:0
                   }]
            }
        }  
    })


export const {addCart,removeCart,quantityUpdate,cleanCart}= cartReducer.actions