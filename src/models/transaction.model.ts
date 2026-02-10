import mongoose, { Document, Schema } from "mongoose";

export interface IPurchasedItems {
    productId: mongoose.Types.ObjectId;
    qty: number;
}

export interface ITransaction extends Document{
    paymentProof: string;
    status: "pending" | "paid" | "rejected";
    purchasedItems: IPurchasedItems[];
    totalPayment: number;
    customerName: string;
    customerContact: string;
    customerAddress: string; 
}

const PurchasedItemsSchema: Schema = new Schema({
    productId:{type: mongoose.Types.ObjectId, require: true, ref: "Product"},
    qty:{type: Number, require: true, min: 1},
}, {_id: false}); 

const TransactionSchema: Schema = new Schema({
    productId:{type:String, require: true},
    status:{ type:String, enum: ["pending", "paid", "rejected"], default: 'pending', require: true },
    purchasedItems:{type: [PurchasedItemsSchema], require: true},
    customerName:{type:String, require: true},
    customerContact:{type:String, require: true},
    customerAddress:{type:String, require: true},
}, {timestamps: true})

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);