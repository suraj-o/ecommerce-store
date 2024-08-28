import { ErrorHandler, Trycatch } from "../middleware/error.js";
import { invalidateCache, reduseStock } from "../utils/feature.js";
import { Order } from "../models/order.js";
import { myCache } from "../server.js";
export const newOrder = Trycatch(async (req, res, next) => {
    const { shippingInfo, orderItems, shippingCharges, subtotal, user, tax, total, discount } = req.body;
    if (!shippingInfo ||
        !orderItems ||
        !user || !total)
        return next(new ErrorHandler("Please fill all the feeds", 400));
    await Order.create({
        shippingInfo,
        orderItems,
        shippingCharges,
        subtotal,
        user,
        tax,
        total,
        discount
    });
    reduseStock(orderItems);
    invalidateCache({ product: true, order: true, admin: true, userId: user });
    res.status(200).json({
        success: true,
        message: "order placed"
    });
});
export const myOrders = Trycatch(async (req, res, next) => {
    const { id: user } = req.query;
    let orders = [];
    if (myCache.has(`myorder-${user}`)) {
        orders = JSON.parse(myCache.get(`myorder-${user}`));
    }
    else {
        orders = await Order.find({ user });
        myCache.set(`myorder-${user}`, JSON.stringify(orders));
    }
    res.status(200).json({
        success: true,
        orders
    });
});
// ADMIN ROUTES
export const allOrders = Trycatch(async (req, res, next) => {
    let orders = [];
    if (myCache.has("allorder")) {
        orders = JSON.parse(myCache.get("allorder"));
    }
    else {
        orders = await Order.find().populate("user", "name email");
        myCache.set("allorder", JSON.stringify(orders));
    }
    res.status(200).json({
        success: true,
        orders
    });
});
export const getSingleOrder = Trycatch(async (req, res, next) => {
    const { id } = req.params;
    const key = `myorder-${id}`;
    let order;
    if (myCache.has(key)) {
        order = JSON.parse(myCache.get(key));
    }
    else {
        order = await Order.findById(id).populate("user", "name");
        if (!order)
            return next(new ErrorHandler("Invalid Order ID", 404));
        myCache.set(key, JSON.stringify(order));
    }
    res.status(200).json({
        success: true,
        order
    });
});
export const processOrder = Trycatch(async (req, res, next) => {
    const { id } = req.params;
    let order;
    order = await Order.findById(id);
    if (!order)
        return next(new ErrorHandler("Invalid Order ID", 404));
    switch (order.status) {
        case "processing":
            order.status = "shipped";
            break;
        case "shipped":
            order.status = "deliverd";
            break;
        case "deliverd":
            return next(new ErrorHandler("product already deliverd", 200));
        default:
            "deliverd";
            break;
    }
    await order.save();
    invalidateCache({ product: false, order: true, admin: true, userId: order.user });
    res.status(200).json({
        success: true,
        meesage: "order procesed"
    });
});
export const deleteSingleOrder = Trycatch(async (req, res, next) => {
    const { id } = req.params;
    let order;
    order = await Order.findById(id);
    if (!order)
        return next(new ErrorHandler("Invalid Order ID", 404));
    await order.deleteOne();
    invalidateCache({ product: false, order: true, admin: true, userId: order.user });
    res.status(200).json({
        success: true,
        message: "order delted successFully"
    });
});
