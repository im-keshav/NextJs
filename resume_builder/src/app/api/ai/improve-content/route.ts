import { generateAiContent } from "@/lib/gemini";
// import connectDB from "@/lib/mongodb";
import {  ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        
        // await connectDB()
        const body:ImproveContentBody= await req.json()
        const {content} = body
        if(!content){
            return NextResponse.json<ApiResponse>({
                message:"All fields are required",
                success:false
            },{
                status:400
            })
        }

        

const prompt = `
You are an expert resume writer, ATS optimization specialist, and professional career consultant.

Improve the following resume content to make it more professional, impactful, and ATS-friendly.

Resume Content:
${content}

STRICT RULES:
1. Return ONLY the improved resume content.
2. Do NOT include a heading, introduction, explanation, conclusion, or any additional text.
3. Preserve the original meaning and factual information.
4. Do NOT invent or add information that is not present in the original content.
5. Do NOT add companies, job titles, technologies, skills, responsibilities, achievements, metrics, certifications, education, or experience that were not provided.
6. Improve grammar, sentence structure, clarity, readability, and professional tone.
7. Use strong, professional, action-oriented language where appropriate.
8. Optimize the content for ATS by naturally incorporating relevant keywords that are already present in the original content.
9. Do NOT keyword-stuff or unnecessarily repeat keywords.
10. Remove unnecessary filler words, generic statements, and redundant information.
11. Make the content concise while preserving important information.
12. Highlight technical contributions, responsibilities, achievements, and impact when they are already present in the original content.
13. Use industry-standard terminology where appropriate without changing the original meaning.
14. Do NOT use first-person pronouns such as "I", "me", or "my".
15. Preserve important numbers, percentages, dates, technologies, and measurable achievements exactly as provided.
16. Do NOT fabricate measurable results or convert general statements into unsupported achievements.
17. Maintain the original context of the content. Do not change a project description into work experience or vice versa.
18. If the original content is already strong, make only meaningful improvements instead of unnecessarily rewriting it.
19. Preserve the original format when possible, except when minor formatting changes improve ATS readability.
20. Return ONLY the final improved content.

FINAL QUALITY CHECK:
- Professional and ATS-friendly
- Clear and concise
- Factually accurate
- No invented information
- Strong action-oriented language
- Relevant keywords preserved
- No unnecessary repetition
- Grammar and spelling corrected
- Original meaning preserved

Improve the resume content now.
`;

const result = await generateAiContent(prompt)
 const improvedContent= result 
 return NextResponse.json<ApiResponse>({
    message:"Resume content improved successfully",
    success:true,
    data:{
        improvedContent
    }
    },{
        status:201
    })


    } catch (error) {
         console.log("error in  improve content api",error)
                return NextResponse.json<ApiResponse>({
                    message:"Something went wrong",
                    success:false
                },{
                    status:500
                })
        
    }
}