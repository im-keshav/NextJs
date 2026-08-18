import { generateAiContent } from "@/lib/gemini";
// import connectDB from "@/lib/mongodb";
import {  ImproveAtsScore } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        
        // await connectDB()
        const body:ImproveAtsScore= await req.json()
        const {resumeText} = body
        if(!resumeText){
            return NextResponse.json<ApiResponse>({
                message:"All fields are required",
                success:false
            },{
                status:400
            })
        }

        

const prompt = `
You are an expert ATS resume evaluator, technical recruiter, and resume optimization specialist.

Analyze the following resume content and calculate an ATS compatibility score.

Resume Content:
${resumeText}

Evaluate the resume based ONLY on the content provided.

ATS EVALUATION CRITERIA:
1. Keyword relevance and optimization
2. Job-role alignment
3. Technical skills coverage
4. Professional summary quality
5. Work experience quality
6. Project relevance and technical depth
7. Quantifiable achievements and impact
8. Resume clarity and readability
9. Professional language and grammar
10. ATS-friendly formatting and structure
11. Relevance and conciseness
12. Use of industry-standard terminology

SCORING RULES:
- Give an overall ATS score from 0 to 100.
- The score must be an integer.
- Do not give a random score.
- Base the score on the actual quality and content of the provided resume.
- A strong, well-structured resume with relevant keywords should receive a higher score.
- Missing or weak information should reduce the score.
- Do not penalize the resume for information that cannot reasonably be determined from the provided text.
- Do not invent information to improve the score.

STRICT OUTPUT RULES:
1. Return ONLY valid JSON.
2. Do NOT return Markdown or code fences.
3. Do NOT include any explanation outside the JSON.
4. The JSON must contain exactly these keys:
   - "score"
   - "summary"
   - "strengths"
   - "improvements"
5. "score" must be an integer between 0 and 100.
6. "summary" must be a concise explanation of the overall ATS performance.
7. "strengths" must be an array of strings containing the strongest ATS aspects found in the resume.
8. "improvements" must be an array of strings containing specific and actionable improvements.
9. Do not make unsupported claims.
10. Keep feedback professional, concise, and actionable.

Example output:
{
  "score": 82,
  "summary": "The resume has strong technical keyword coverage and relevant experience, but could be improved with more measurable achievements and stronger alignment between responsibilities and target roles.",
  "strengths": [
    "Strong technical skill coverage",
    "Relevant industry keywords",
    "Clear professional experience",
    "Good use of action-oriented language"
  ],
  "improvements": [
    "Add measurable achievements where applicable",
    "Strengthen the professional summary with role-specific keywords",
    "Include more specific technical contributions in project descriptions",
    "Remove repetitive or generic statements"
  ]
}

Generate the ATS evaluation now.
`;

const result = await generateAiContent(prompt)
 const AtsScore= result 
 return NextResponse.json<ApiResponse>({
    message:"Ats score calculated successfully",
    success:true,
    data:{
        AtsScore
    }
    },{
        status:201
    })


    } catch (error) {
         console.log("error in  ats score api",error)
                return NextResponse.json<ApiResponse>({
                    message:"Something went wrong",
                    success:false
                },{
                    status:500
                })
        
    }
}