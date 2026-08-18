import { generateAiContent } from "@/lib/gemini";
import connectDB from "@/lib/mongodb";
import { GenerateSummaryBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        
        // await connectDB()
        const body:GenerateSummaryBody= await req.json()
        const {jobTitle,skills,experienceLevel} = body
        if(!jobTitle || !skills || !experienceLevel){
            return NextResponse.json<ApiResponse>({
                message:"All fields are required",
                success:false
            },{
                status:400
            })
        }

        

        const prompt = `
You are an expert ATS resume writer and professional career consultant.

Generate a professional, ATS-friendly resume summary using ONLY the information provided below.

Job Title: ${jobTitle}
Experience Level: ${experienceLevel}
Skills: ${skills}

STRICT RULES:
1. Return ONLY the final resume summary.
2. The summary MUST be between 50 and 80 words, inclusive.
3. NEVER exceed 80 words.
4. NEVER write fewer than 50 words.
5. Before returning the response, internally count the words and revise the summary if it is outside the 50-80 word range.
6. Write exactly ONE paragraph.
7. Do NOT include a heading such as "Professional Summary" or "Career Objective".
8. Do NOT include bullet points, numbering, labels, or explanations.
9. Tailor the summary specifically to the provided Job Title and Experience Level.
10. Naturally incorporate relevant skills and ATS-friendly keywords from the provided skills.
11. Optimize for ATS keyword matching without keyword stuffing.
12. Highlight relevant technical expertise, professional strengths, problem-solving ability, and potential value to the employer.
13. For fresher/entry-level candidates, focus on technical skills, foundational knowledge, adaptability, problem-solving, and potential contribution. Do NOT invent professional experience.
14. NEVER invent companies, experience, achievements, projects, certifications, education, responsibilities, or technologies that were not provided.
15. Avoid generic filler phrases and clichés.
16. Use clear, professional, concise language.
17. Write in third person. Do NOT use "I", "me", or "my".
18. Return ONLY plain-text summary content with no additional text.

FINAL VALIDATION:
- Word count >= 50
- Word count <= 80
- Exactly one paragraph
- No heading
- No bullets
- No explanation
- No invented information

Generate the final resume summary now.
`;

const result = await generateAiContent(prompt)
 const summary= result 
 return NextResponse.json<ApiResponse>({
    message:"Resume summary generated successfully",
    success:true,
    data:{
        summary
    }
    },{
        status:201
    })


    } catch (error) {
         console.log("error in  generate summary api",error)
                return NextResponse.json<ApiResponse>({
                    message:"Something went wrong",
                    success:false
                },{
                    status:500
                })
        
    }
}