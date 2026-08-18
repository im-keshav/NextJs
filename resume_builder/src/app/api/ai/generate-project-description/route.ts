import { generateAiContent } from "@/lib/gemini";
import connectDB from "@/lib/mongodb";
import { GenerateProjectDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        
       
        const body:GenerateProjectDescriptionBody= await req.json()
        const {jobTitle,experienceLevel,techStack} = body
        if(!jobTitle  || !experienceLevel || !techStack){
            return NextResponse.json<ApiResponse>({
                message:"All fields are required",
                success:false
            },{
                status:400
            })
        }

        

const prompt = `
You are an expert resume writer and ATS optimization specialist.

Generate a professional, ATS-friendly project description based ONLY on the following information:

Job Title: ${jobTitle}
Experience Level: ${experienceLevel}
Tech Stack: ${techStack}

STRICT RULES:
1. Return ONLY the project description.
2. Do NOT include a heading such as "Project Description".
3. Write exactly ONE paragraph.
4. Keep the description between 50 and 80 words.
5. Do NOT exceed 80 words.
6. Do NOT write fewer than 50 words.
7. Tailor the description to the specified job title and experience level.
8. Naturally incorporate the provided technologies from the tech stack.
9. Describe a realistic project that demonstrates the technical skills relevant to the job role.
10. Focus on functionality, technical implementation, and practical use of the technologies.
11. Use professional, ATS-friendly terminology.
12. Do NOT keyword-stuff.
13. Do NOT invent specific metrics, users, companies, clients, revenue, or achievements.
14. Do NOT claim specific features unless they can reasonably be inferred from the provided job title and tech stack.
15. Do NOT use first-person pronouns such as "I", "me", or "my".
16. Do NOT include bullet points, numbering, emojis, or special formatting.
17. Avoid generic filler and unnecessary statements.
18. Before returning the response, internally verify that the description contains between 50 and 80 words.
19. Return ONLY the final project description text.

Example output:
Developed a full-stack web application using React.js, Node.js, Express.js, and MongoDB, designed to provide a scalable solution for managing application data and user interactions. Implemented RESTful APIs, database integration, authentication, and responsive user interfaces while following modern development practices. The project demonstrates practical experience in building maintainable web applications and applying full-stack development concepts relevant to a MERN Stack Developer role.

Generate the project description now.
`;
const result = await generateAiContent(prompt)
 const  projectDescription  = result
 return NextResponse.json<ApiResponse>({
    message:"Resume Project Description generated successfully",
    success:true,
    data:{
        projectDescription
    }
    },{
        status:201
    })


    } catch (error) {
         console.log("error in  generate Project Description api",error)
                return NextResponse.json<ApiResponse>({
                    message:"Something went wrong",
                    success:false
                },{
                
                    status:500
                })
        
    }
}