export interface UserReducerSate{
    isLoading:boolean
    user:string,
    isLogin:boolean
    userData:UserType
}

export interface CategoryResponse{
    sucess:boolean,
    categories:string[]
}

export interface UserType{
    name:string,
    email:string,
    photo:string,
    gender:string
}

export interface UserProfileResponse {
    sucess:boolean
    user:{
    name:string,
    email:string,
    photo:string,
    gender:string
    }
}

export interface Product{
    _id:string
    name:string,
    photo:string,
    price:number,
    stock:number,
    category:string,
    createdAt:Date,
    updatedAt:Date
}

export interface GetLatestProductResponse {
    success:boolean,
    products:Product[]
}

export interface SearchQuery {
    search?: string,
    sort?:string,
    price?: number,
    page?: number,
    category?:string,
}

export type SearchResponse={
    success:boolean
    filteredProduct:Product[];
    totalPages:number
}
export type UserResponse={
    success:boolean
    message:string
    user:string
}