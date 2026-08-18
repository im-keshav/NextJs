import { generateJsonWebToken } from "@/lib/jwt";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import  {RegisterBody}  from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

       const body: RegisterBody = await req.json()
       const {name ,email, mobile, password} = body
       if(!name || !email || !password) {
        return NextResponse.json<ApiResponse>({
            message:"All fields are required",
            success:false},{
                status:400 
            })
       }
       const isExisted = await  UserModel.findOne({email})
       if(isExisted){ return NextResponse.json<ApiResponse>({
            message:"User already exists",
            success:false},{
                status:409 
            })
       }
       const newUser = await UserModel.create({
        name, email, password,mobile
       })

       const token = generateJsonWebToken({userId:newUser._id.toString()})
       const response = NextResponse.json<ApiResponse>({
            message:"User registered successfully",
            success:true,
            data:{
                token,
                user:{_id:newUser._id,email:newUser.email,name:newUser.name}
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

