import { ErrorHandler, Trycatch } from "../middleware/error.js";
import { User } from "../models/user.js";
import { rm } from "fs";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/feature.js";
export const newUser = Trycatch(async (req, res, next) => {
    const { name, email, password, gender } = req.body;
    const photo = req.file;
    if (!name || !email || !password) {
        if (photo) {
            rm(photo.path, () => {
                console.log("photo path remove successfully");
            });
        }
        return next(new ErrorHandler("Fill all require things", 400));
    }
    ;
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
        return next(new ErrorHandler("email already exist please login", 400));
    const user = await User.create({
        name,
        email,
        password,
        gender,
        photo: photo.path
    });
    return sendCookies(req, res, next, user._id.toString(), "signup successfully");
});
export const signin = Trycatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new ErrorHandler("Fill all require things", 400));
    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return next(new ErrorHandler("User not exist", 400));
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
        return next(new ErrorHandler("Password", 400));
    return sendCookies(req, res, next, user._id.toString(), "signin successfully");
});
export const getMe = Trycatch(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("invalid id", 400));
    res.status(201).json({
        success: true,
        user
    });
});
// ADMIN ROUTE
export const getAllUers = Trycatch(async (req, res, next) => {
    const user = await User.find({});
    res.status(200).json({
        success: true,
        user,
    });
});
export const deleteUser = Trycatch(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("invalid id", 400));
    await user.deleteOne();
    res.status(201).json({
        success: true,
        message: "user deleted succuessFully"
    });
});
