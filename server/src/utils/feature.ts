import { NextFunction, Request ,Response} from "express"
import mongoose from "mongoose"
import { ErrorHandler, Trycatch } from "../middleware/error.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import { myCache } from "../server.js"
import { Products } from "../models/products.js"
import { InvalidateCache, OrderItems } from "../types/types.js"
import { Order } from "../models/order.js"
import faker from "@faker-js/faker"

export const connectDB=()=>{
    mongoose.connect(process.env.DB_URL as string,{
        dbName:"ecommerceAPP"
    }).then(c=>console.log(`Connect to ${c.connection.host}`))
    .catch(c=>console.log(c))
}


export const sendCookies= (req:Request,res:Response,next:NextFunction,id:string,message:string)=>{
    if(req.cookies[String(`${process.env.AUTH_ID}`)]) return next(new ErrorHandler("you are already logged in",400));

    // Creating Cookie Token
    const token= jwt.sign(id,process.env.JWT_SECRET!)

    return res.cookie(process.env.AUTH_ID as string, token, {
        maxAge: 2 * 24 * 60 * 60 * 1000 ,
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }).status(201).json({
        success:true,
        message,
        user:id
    })
}

const isAdmin=Trycatch(async(req,res,next)=>{
    const {admin}=req.query;
    if(!admin)return next(new ErrorHandler("login first",401));

    const user=await User.findById(admin);
    if(!user) return next(new ErrorHandler("user not found",404));

    if(user.role!=="admin") next(new ErrorHandler("only admin can use this route",401))

    next()
})

export default isAdmin;



// fuction for to invalidate the cache memory 
export const invalidateCache=async({product,order,admin,userId}:InvalidateCache)=>{
    if(product){
        const productkey:string[]=["latest-product","categories","admin-products"];
    
        const productId=await Products.find({}).select("_id");
        productId.forEach(i=>{
            productkey.push(`product-${i._id}`)
        })
        
         myCache.del(productkey)
    }
    if(order){
        const orderkey:string[]=["allorder",`myorder-${userId}`];
        const order=await Order.find({}).select("_id");
    
        order.forEach(i=>{
            orderkey.push(`order-${i._id}`)
        })
    
         myCache.del(orderkey)
    }
    if(admin){
        const adminKey:Array<string>=["admin-dasboard-stats","admin-dasboard-pie","admin-bar-chart","admin-line-chart"];
        myCache.del(adminKey)
    }
    }
    

    // REDUCE STOCK

    export const reduseStock=async(orderItems:OrderItems[])=>{
        for(let i=0;i<orderItems.length;i++){
            const order=orderItems[i];
            const product=await Products.findById(order.productId);
            if(!product) throw new Error("product not found");
            product.stock! -= order.quantity;
            await product.save()
        }
    }
    


    export const fake= async()=>{
        for(let i=0; i < 10 ; i++){
            console.log(i)
            const product={
                name:"check",
                price:2000,
                stock:10,
                category:"electronic",
                photo:"https://i0.wp.com/fennecandfriends.com/wp-content/uploads/2018/08/FF-0918-5-RANDOM-PRODUCTS-YOU-DIDNT-KNOW-YOU-NEEDED-FAST-BOILED-EGGS.jpg?resize=1050%2C1050&ssl=1"
            }

            await Products.create(product)
        }
    }