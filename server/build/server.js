import express from "express";
import NodeCache from "node-cache";
import { connectDB } from "./utils/feature.js";
import { ErrorHandler, errorMiddlewere, Trycatch } from "./middleware/error.js";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import crypto from "crypto";
const server = express();
export const myCache = new NodeCache();
// USING MIDDLEWARES
connectDB();
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
;
server.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
server.use(cookieParser());
// Importing Routes 
import User from "./routes/user.js";
import Product from "./routes/product.js";
import Razorpay from "razorpay";
import { Order } from "./models/order.js";
server.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "all ok server is working in good condition"
    });
});
server.use("/api/v1/user", User);
server.use("/api/v1/product", Product);
server.post("/api/v1/genrate-order", Trycatch(async (req, res, next) => {
    console.log(req.body);
    const { user, userInfo, products, amount, orders } = req.body;
    const razorpayInstance = new Razorpay({
        key_id: process.env.KRY_ID,
        key_secret: process.env.KEY_SECRET,
    });
    const order = await razorpayInstance.orders.create({
        amount: Number(amount.total * 100),
        currency: "INR",
        receipt: `order-${Math.floor(Math.random() * 40)}`
    });
    if (!order)
        return next(new ErrorHandler("Failed to genrate order", 500));
    let orderItem = products.map(product => ({
        name: product.name,
        price: Number(product.price),
        category: product.category,
        quantity: Number(product.quantity),
        photo: product.photo,
        product_id: product._id
    })).filter(value => value?.quantity > 0);
    console.log(orderItem);
    await Order.create({
        payment_order_id: order.id,
        payment: "nill",
        count: orders,
        shippingInfo: {
            name: userInfo.fullname,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address
        },
        user,
        subtotal: amount.subtotal,
        shipingCharges: amount.shipping,
        tax: amount.tax,
        total: amount.total,
        orderItems: orderItem
    });
    res.status(201).json({
        success: true,
        order,
    });
})),
    server.post("/api/v1/payment-verification", async (req, res, next) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const genrateSignature = crypto.createHmac("sha256", process.env.KEY_SECRET)
            .update(body.toString())
            .digest("hex");
        let verify = genrateSignature === razorpay_signature;
        if (verify) {
            const order = await Order.findOne({ payment_order_id: razorpay_order_id });
            if (order) {
                order.payment = "fullfil";
                await order.save();
            }
        }
        else {
            await Order.deleteOne({ payment_order_id: razorpay_order_id });
        }
        res.status(201).redirect("http://localhost:5173/success");
    }),
    server.use("/uploads", express.static("uploads"));
server.use(errorMiddlewere);
server.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});
