import { generateAiContent } from "@/lib/gemini";
import connectDB from "@/lib/mongodb";
import { GenerateSkillsBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        
        
        const body:GenerateSkillsBody= await req.json()
        const {jobTitle,experienceLevel} = body
        if(!jobTitle  || !experienceLevel){
            return NextResponse.json<ApiResponse>({
                message:"All fields are required",
                success:false
            },{
                status:400
            })
        }

        

const prompt = `
You are an expert technical recruiter and ATS resume specialist.

Generate the most relevant TECHNICAL SKILLS for the following job position.

Job Title: ${jobTitle}
Experience Level: ${experienceLevel}

STRICT OUTPUT RULES:
1. Return ONLY a valid JSON array.
2. The root response MUST be an array of strings.
3. Do NOT return an object or use keys such as "technicalSkills", "skills", or "data".
4. Do NOT return the JSON array as a string.
5. Do NOT wrap the response in Markdown code fences.
6. Do NOT include any text before or after the JSON array.
7. Do NOT include explanations, descriptions, headings, comments, or sentences.
8. Generate approximately 10-20 relevant technical skills.
9. Include ONLY technical skills relevant to the specified job title.
10. Do NOT include soft skills such as communication, leadership, teamwork, adaptability, time management, etc.
11. Include relevant programming languages, frameworks, libraries, databases, APIs, developer tools, cloud technologies, testing tools, DevOps technologies, and other technical competencies when appropriate.
12. Prioritize technologies commonly expected for the specified job title and recognized by ATS systems.
13. Do NOT add unrelated technologies simply to increase the number of skills.
14. Use standard and commonly recognized technology names.
15. Do NOT duplicate skills.
16. Do NOT invent unusual or irrelevant technologies.
17. The output MUST be directly parseable using JSON.parse().
18. Return ONLY the JSON array.

Example output:
[
  "JavaScript",
  "TypeScript",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "Git",
  "GitHub",
  "Docker",
  "Postman"
]

Generate the technical skills now.
`; 

const result = await generateAiContent(prompt)
 let skills= result
 if(typeof skills ==="string"){
    try {
        skills = JSON.parse(skills)
        
    } catch (error) {
        return NextResponse.json<ApiResponse>({
            message:"Failed to parse skills",
            success:false
        },{
            status:500
        })
    }
 }
 return NextResponse.json<ApiResponse>({
    message:"Resume skills generated successfully",
    success:true,
    data:{
        skills
    }
    },{
        status:201
    })


    } catch (error) {
         console.log("error in  generate skills api",error)
                return NextResponse.json<ApiResponse>({
                    message:"Something went wrong",
                    success:false
                },{
                    status:500
                })
        
    }
}