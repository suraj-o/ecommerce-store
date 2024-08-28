import { NextFunction, Request, Response } from "express";
import { ErrorHandler, Trycatch } from "../middleware/error.js";
import { rm } from "fs";
import { Products } from "../models/products.js";
import { BaseQuerry, NewProductRequestBody, RequestQuerry } from "../types/types.js";
import { myCache } from "../server.js";
import { invalidateCache } from "../utils/feature.js";

export const newProduct=Trycatch(async(
    req:Request<{},{},NewProductRequestBody>,
    res:Response,
    next:NextFunction)=>{
        const { name , category , price , stock}=req.body;
        const photo=req.file;
        
        if(!photo) return next(new ErrorHandler("please add photo",400))
        if(!name ||!category|| !price||!stock) return next(new ErrorHandler("please fill all fields",400))

        if(!name ||!category|| !price||!stock){
            rm(photo!.path,()=>{
                console.log("deleted")
            })
        } 

        await Products.create({
            name,
            category,
            price,
            stock,
            photo:photo!.path
        })
        
        invalidateCache({product:true,admin:true,})
        res.status(201).json({
            success:true,
            message:"products add successfully"
        })
    })


    


    export const getlatestProducts=Trycatch(async(req,res,next)=>{
        let products;

        if(myCache.has("latest-product")){
           products=JSON.parse(myCache.get("latest-product") as string)
        }
        else{
           products=await Products.find({}).sort({createdAt:-1}).limit(5);
           myCache.set("latest-product",JSON.stringify(products))
        }

       res.status(200).json({
           success:true,
           products
       })
   })

   export const getAllCategories=Trycatch(async(req,res,next)=>{
    let categories;

    if(myCache.has("categories")){
        categories=JSON.parse(myCache.get("categories") as string)
    }
    else{
        categories=await Products.distinct("category");
        myCache.set("categories",JSON.stringify(categories));
    }

    res.status(200).json({
        success:true,
        categories
    })
})

export const getSingleProduct=Trycatch(async(req,res,next)=>{
    const id=req.params.id
    let product;

    if(myCache.has(`product-${id}`)){
        product=JSON.parse(myCache.get(`product-${id}`) as string)
    }
    else{
        product=await Products.findById(id);
        if(!product)return next(new ErrorHandler("Invalid id",404));

        myCache.set(`product-${id}`,JSON.stringify(product))
    }

    res.status(200).json({
        success:true,
        product        
    })
})

export const getAllProducts=Trycatch(async(
    req:Request<{},{},{},RequestQuerry>,
    res,
    next
    ) => {
    const {search,sort,price,category}=req.query;

    const page=Number(req.query.page);

    const limit=Number(process.env.PAGE_LIMIT || 8)

    const skip= (page-1)*limit;

    const baseQuerry:BaseQuerry={}

    if(search){
        baseQuerry.name={
            $regex:search,
            $options:"i"
        };
    };
    if(price){
        baseQuerry.price={
            $lte:Number(price)
        }
    };
    if(category) baseQuerry.category=category;

    // calling multiple api in one time
    const [filteredProduct,product]=await Promise.all([
    // calling filteredProduct Promise
        Products.find(baseQuerry)
        .sort(sort&&{price:sort=="asc"?1:-1}).limit(limit).skip(skip),

    //calling product Promise  
        Products.find({})
    ])

    const totalPages =Math.ceil(product.length / limit)

    res.status(200).json({
        success:true,
        filteredProduct,
        totalPages
    })
})

// ADMIN ROUTES
export const adminProducts=Trycatch(async(req,res,next)=>{
    let product;
    if(myCache.has("admin-products")){
        product=JSON.parse(myCache.get("admin-products") as string)
    }
    else{
        product= await Products.find({});
        myCache.set("admin-products",JSON.stringify(product));
    }

    res.status(200).json({
        success:true,
        product        
    })
})

export const updateProduct=Trycatch(async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        const {id}=req.params;
        const { name , category , price , stock}=req.body;
        const photo=req.file;

        const product=await Products.findById(id);
        if(!product)return next(new ErrorHandler("Invalid ID",404));

        if(photo){
            rm(product.photo!,()=>{
                console.log("old photo deleted")
            })
        }

        if(name) product.name=name;
        if(price) product.price=price;
        if(stock) product.stock=stock;
        if(category) product.category=category;
        if(photo) product.photo=photo.path!;

        await product.save();

        invalidateCache({product:true})

        res.status(201).json({
            success:true,
            message:"products update successfully"
        })
    })

    export const deleteProduct=Trycatch(async(req,res,next)=>{
        const product=await Products.findById(req.params.id);
        if(!product)return next(new ErrorHandler("Invalid id",404));

        rm(product.photo!,()=>{
            console.log("deleted")
        })
       
        await product.deleteOne();
        // invalidateCache({product:true})

        res.status(200).json({
            success:true,
            message:"products deleted successfully"
        })
    })