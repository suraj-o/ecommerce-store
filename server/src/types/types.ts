import { NextFunction, Request, Response } from "express";


export interface NewUserRequestBody{
    name:string;
    email:string;
    password:string
    photo?:File;
    gender:string;
}
export interface NewProductRequestBody{
    name:string;
    category:string;
    price:number;
    photo:string;
    stock:number;
}

export type TryCatchFuc=(req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;

export interface RequestQuerry{
    search?:string;
    sort?:string;
    price?:string;
    category?:string;
    page?:string
}
export interface BaseQuerry{
    name?:{
        $regex:string,
        $options:string
    };
    price?:{
        $lte:number
    };
    category?:string;
}

export type InvalidateCache={
    product?:boolean;
    order?:boolean;
    admin?:boolean;
    userId?:string;
}

export type ShippingInfo={
    address:string,
    city:string,
    country:string,
    state:string,
    pincode:number
    totalOrders?:number
}
export type OrderItems={
    name:string,
    photo:string,
    price:number,
    quantity:number,
    productId:string
}

export interface OrderRequestBody{
    shippingInfo:ShippingInfo,
    user:string,
    subtotal:number,
    tax:number,
    total:number,
    discount:number,
    shippingCharges:number,
    orderItems:OrderItems[]
}

export type CalclutePercentage=(a:number,b:number)=>string;

export interface NewOrderProps{
    user:string,
    userInfo:{
        fullname:string,
        address:string,
        email:string,
        phone:string
        },
    products:{
        _id:string
        name:string,
        photo:string,
        price:number,
        quantity:number,
        category:string
        stock:number,
    }[],
    orders:string,
    amount:{
        subtotal:number,
        shipping:number,
        tax:number,
        total:number,
    }
}