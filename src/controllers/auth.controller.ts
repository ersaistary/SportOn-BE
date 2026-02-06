import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models";

const JWT_SECRET= process.env.JWT_SECRET || "Sporton123";

export const signin = async (req: Request, res:Response): Promise<void> => {
    try {
        const {email, password}= req.body;
        const user = await User.findOne({email});

        // check apakah usernya ada atau tidak
        if(!user){
            res.status(400).json({message: "Invalid Credentials, Email not found"})
            return;
        }

        // validasi password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({message: "Invalid Credentials, Wrong Password"});
            return;
        }

        // generate json web token
        const token = jwt.sign({id: user._id, email: user.email}, JWT_SECRET, {
            expiresIn: "1d"
        })

        res.json({
            token, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Sign In Error: ", error);
        res.status(400).json({message: "Internal server error"});
    }
};

export const initateAdmin = async (req:Request, res:Response): Promise<void> => {
    try {
        const {email, password, name}= req.body;

        // check apakah inputan sudah ada atau belum
        const count = await User.countDocuments({});
        if(count>0){
            res.status(400).json({message: "We can only have 1 admin user. If you want to create new admin user, please delete manually form the database"})
            return;
        }

        // enkripsi password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email, 
            password: hashedPassword,
            name
        })

        await newUser.save();

        res.status(201).json({message: "Admin user created sucessfully"})
    } catch (error) {
        console.error("Initiate new admin user error: ", error);
        res.status(400).json({message: "Internal server error"});
    }
}