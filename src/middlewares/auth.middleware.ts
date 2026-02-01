import { Request, Response, NextFunction } from "express";
import jtw from "jsonwebtoken";

const JWT_SECRET= process.env.JWT_SECRET || "Sporton123";

export interface AuthRequest extends Request{
    user?: any;
}

export const authenticate = (req: AuthRequest, res:Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        res.status(400).json({message:"Authentication Required!"});
        return;
    }

    try {
        // melihat apakah token valid atau tidak
        const decoded = jtw.verify(token,JWT_SECRET);
        req.user = decoded;
        next(); // lanjut ke controller
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Invalid token"})
    }
}