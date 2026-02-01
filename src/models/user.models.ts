import mongoose, { Schema } from "mongoose";

export interface IUser extends Document{
    email: string;
    password: string;
    name: string;
}

const UserSchema: Schema = new Schema({
    email:{type: String, require: true, unique: true},
    password:{type: String, require: true},
    name:{type: String, require: true},
}, {timestamps: true}); 

export default mongoose.model<IUser>("User", UserSchema);