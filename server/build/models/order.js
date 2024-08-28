import mongoose from "mongoose";
const schema = new mongoose.Schema({
    payment_order_id: {
        type: String,
        require: true
    },
    payment: {
        type: String,
        require: true,
        enum: ["fullfil", "nill"]
    },
    count: {
        type: Number,
        require: true
    },
    shippingInfo: {
        address: {
            type: String,
            requrie: true
        },
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        }
    },
    user: {
        type: String,
        ref: "User",
        require: true
    },
    subtotal: {
        type: Number,
        require: true,
        default: 0
    },
    shipingCharges: {
        type: Number,
        require: true,
        default: 0
    },
    tax: {
        type: Number,
        require: true,
        default: 0
    },
    total: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ["processing", "shipped", "deliverd", "order already deliverd"],
        default: "processing"
    },
    orderItems: [
        {
            name: String,
            photo: String,
            price: Number,
            quantity: Number,
            category: String,
            product_id: {
                type: String,
                ref: "Products"
            },
        },
    ]
}, {
    timestamps: true
});
export const Order = mongoose.model("Order", schema);
