import mongoose, { Document, Schema } from "mongoose";

export interface IBank extends Document {
    bankName: string,
    accountName: string,
    accountNumber: string
}

const BankSchema: Schema = new Schema({
    bankName:{type: String, require: true},
    accountName:{type: String, require: true},
    accountNumber:{type: String, require: true},
}, {timestamps: true}); 

export default mongoose.model<IBank>("Bank", BankSchema);