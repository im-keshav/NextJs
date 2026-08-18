import { getCurrentUser } from "@/lib/getCurrentUser";
import connectDB from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,
    {params}:{params:Promise<{resumeId:string}>}){
    try {
        await connectDB()

        const user = await getCurrentUser()

        const {resumeId} = await params

        const resume = await ResumeModel.findOne({
            _id:resumeId,
            userId:user?._id
        })
        if(!resume){
            return NextResponse.json<ApiResponse>({
                message:"Resume not found",
                success:false
            },{
                status:404
            })
        }
        return NextResponse.json<ApiResponse>({
            message:"Resume fetched successfully",
            success:true,
            data:{
                resume
            }
        },{
            status:200
        })

        
        
    } catch (err) {
         console.log("error in get resume api",err)
        return NextResponse.json<ApiResponse>({
            message:"Something went wrong",
            success:false
        },{
            status:500
        })
    }
}

export async function PATCH(req:NextRequest,
    {params}:{params:Promise<{resumeId:string}>}){
    try {
        await connectDB()

        const user = await getCurrentUser()

        const body = await req.json()

        const {resumeId} = await params

      const updatedResume = await ResumeModel.findByIdAndUpdate({
        _id:resumeId,
        user_id:user.userId
      },{
        $set:body,
      },{
        new:true,
        runValidators:true
      })
        if(!updatedResume){
            return NextResponse.json<ApiResponse>({
                message:"Unable to update resume",
                success:false
            },{
                status:500
            })
        }
        return NextResponse.json<ApiResponse>({
            message:"Resume updated successfully",
            success:true,
            data:{
                updatedResume
            }
        },{
            status:200
        })

        
        
    } catch (err) {
         console.log("error in get resume api",err)
        return NextResponse.json<ApiResponse>({
            message:"Something went wrong",
            success:false
        },{
            status:500
        })
    }
}


