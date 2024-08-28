import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please emter name"],
    },
    photo: {
        type: String,
        require: [true, "Please add image"]
    },
    price: {
        type: Number,
        require: [true, "please enter products price"]
    },
    stock: {
        type: Number,
        require: [true, "Please add stock"]
    },
    category: {
        type: String,
        require: [true, "Please add category"]
    },
}, {
    timestamps: true
});
export const Products = mongoose.model("Products", schema);
