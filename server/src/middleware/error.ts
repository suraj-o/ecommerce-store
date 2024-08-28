import { NextFunction,Request,Response } from "express";
import { TryCatchFuc } from "../types/types.js";



export class ErrorHandler extends Error {
    constructor(public message:string,public status:number){
        super(message);
        this.status=status
    }
}

export const errorMiddlewere=( 
    err:ErrorHandler,
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
        
    err.message||="internal server error";
    err.status||=500;
    
    return res.status(err.status).json({
        succes:false,
        message:err.message
    })
}


export const Trycatch= (func:TryCatchFuc)=>(req:Request,res:Response,next:NextFunction)=>{
    return Promise.resolve(func(req,res,next)).catch(next)
}