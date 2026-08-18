import connectDB from "@/lib/mongodb";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User.model";
import { LoginBody } from "@/types/user.types";
import { generateJsonWebToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

       let body: LoginBody = await req.json()
       let {email,password} = body
       if(!email || !password) {
        return NextResponse.json<ApiResponse>({
            message:"All fields are required",
            success:false},{
                status:400 
            })
       }
       let isExisted = await  UserModel.findOne({email})
       if(!isExisted){ return NextResponse.json<ApiResponse>({
            message:"User does not exist",
            success:false},{
                status:404
            })
       }
       let matchPass = isExisted.comparePass(password)
       if(!matchPass){
        return NextResponse.json<ApiResponse>({
            message:"Invalid credentials",
            success:false},{
                status:401
            })
       }

       let token = generateJsonWebToken({userId:isExisted._id.toString()})
       let response = NextResponse.json<ApiResponse>({
            message:"User registered successfully",
            success:true,
            data:{
                token,
                user:{_id:isExisted._id,email:isExisted.email,name:isExisted.name}
            }
       },
    {
        status:201
    }) 
    response.cookies.set('token',token,{
        httpOnly:true,
        sameSite:'lax',
        maxAge:60*60*24*7
    })
    return response
    } catch (error) {

        console.log(error)
        return NextResponse.json<ApiResponse>({message:"internal server error",success:false,error:{error}},{
            status:500
        })
    }

}