import express  from "express";
import { allOrders, deleteSingleOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.js";
import isAdmin from "../utils/feature.js";

const order =express.Router()

order.post("/neworder",newOrder);
order.get("/myorder",myOrders);
order.get("/allorders",isAdmin,allOrders);
order.route("/allorders/:id").get(isAdmin,getSingleOrder)
                             .put(isAdmin,processOrder)
                             .delete(isAdmin,deleteSingleOrder);
           

export default order;