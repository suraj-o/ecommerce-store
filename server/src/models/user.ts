import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"
interface IUser extends Document{
    name:string;
    photo:string;
    role:"user"|"admin";
    email:string;
    password:string;
    gender:"male"|"female"|"custom";
    createdAt:Date;
    updatedAt:Date;
}


const schema = new Schema(
    {
        name:{
            type:String,
            require:[true,"Please provide user name"]
        },
        email:{
            type:String,
            require:[true,"Please provide user email"],
            unique:true
        },
        photo:{
            type:String,
            default:["https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"]
        },
        password:{
            type:String,
            require:[true,"Please provide user password"],
            select:false
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        },
        gender:{
            type:String,
            require:[true,"Please add gender"],
            enum:["male","female","custom"],
            default:"male"
        },
    },{
        timestamps:true
    }
)

schema.pre("save",async function(){
    if(!this.isModified("password")) return null
    let hashPassword= await bcrypt.hash(this.password!,10)
    this.password=hashPassword
})

export const User = model<IUser>("User",schema);