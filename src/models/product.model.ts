import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
    name: string, 
    description: string,
    category: mongoose.Types.ObjectId,
    stock: number,
    price: number,
    imageUrl: string
}

const ProductSchema: Schema = new Schema({
    name:{type: String, require: true},
    description:{type: String, require: true},
    category:{type: mongoose.Types.ObjectId, require: true, ref: "Category"},
    stock:{type: Number, require: true},
    price:{type: Number, require: true},
    imageUrl:{type: String, require: true},
}, {timestamps: true}); 

export default mongoose.model<IProduct>("Product", ProductSchema);