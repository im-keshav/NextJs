import { getCurrentUser } from "@/lib/getCurrentUser";
import connectDB from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        await connectDB()
        const userId = await getCurrentUser();

        const  newResume = await ResumeModel.create({
            user_id:userId,
            title:"",
            summary:"",
            personalInfo:{},
            workExperience:[],
            projects:[],
            education:[],
            skills:[],
            certifications:[],
        })
        return NextResponse.json<ApiResponse>({
            success:true,
            message:"Resume created successfully",
            data:{
                resume:newResume
            }
        },{
            status:201
        })
    } catch (error) {
        console.log("error in create resume api",error)
        return NextResponse.json<ApiResponse>({
            message:"Internal server error",
            success:false
        },{
            status:500
        })
        
    }
    


}