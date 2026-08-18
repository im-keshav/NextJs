import jwt from "jsonwebtoken"
import { JWTPayload } from "@/types/user.types"

export const generateJsonWebToken = (payload:JWTPayload):string =>{
    const token = jwt.sign(payload,process.env.JWT_SECRET!,
        {
            expiresIn:"1h"
        }
        )
    return token
}

export const verifyToken = (token: string)=>{
    const decoded = jwt.verify(token,process.env.JWT_SECRET!)
    return decoded 
}