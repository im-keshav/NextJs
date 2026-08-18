import { generateAiContent } from "@/lib/gemini";
import connectDB from "@/lib/mongodb";
import { GenerateExperienceDescriptionBody} from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        
       
        const body:GenerateExperienceDescriptionBody= await req.json()
        const {yearsOfExperience,experienceLevel,techStack,jobRole} = body
        if(!yearsOfExperience  || !experienceLevel || !techStack || !jobRole){
            return NextResponse.json<ApiResponse>({
                message:"All fields are required",
                success:false
            },{
                status:400
            })
        }

        

const prompt = `
You are an expert resume writer, ATS optimization specialist, and technical recruiter.

Generate a professional, ATS-friendly work experience description using ONLY the following information:

Experience Level: ${experienceLevel}
Years of Experience: ${yearsOfExperience}
Job Role: ${jobRole}
Tech Stack: ${techStack}

STRICT RULES:
1. Return ONLY the work experience description.
2. Do NOT include a heading, job role, company name, introduction, explanation, or conclusion.
3. Write exactly ONE professional paragraph.
4. Keep the description between 50 and 80 words.
5. Do NOT exceed 80 words.
6. Do NOT write fewer than 50 words.
7. Tailor the description specifically to the provided job role and experience level.
8. Accurately reflect the provided years of experience.
9. Naturally incorporate relevant technologies from the provided tech stack.
10. Focus on realistic professional responsibilities, technical contributions, development activities, and business value relevant to the role.
11. Use strong action-oriented and ATS-friendly terminology.
12. Do NOT keyword-stuff.
13. Do NOT invent company names, clients, projects, achievements, metrics, revenue, awards, certifications, or responsibilities that were not provided.
14. Do NOT claim senior-level responsibilities if the provided experience level does not support them.
15. Do NOT exaggerate the candidate's experience.
16. Do NOT use first-person pronouns such as "I", "me", or "my".
17. Do NOT use bullet points, numbering, emojis, or special formatting.
18. Use present tense for a current role and past tense for a previous role.
19. Avoid generic filler phrases and clichés.
20. Before returning the response, internally verify that the description contains between 50 and 80 words.
21. Return ONLY the final work experience description text.

Example output:
Developed and maintained scalable web applications using React.js, Node.js, Express.js, and MongoDB, implementing reusable components, RESTful APIs, and efficient database solutions. Collaborated with cross-functional teams to deliver new features, troubleshoot technical issues, optimize application performance, and maintain clean, reusable code. Contributed to the development lifecycle while following modern software engineering practices and delivering reliable solutions aligned with business requirements.

Generate the work experience description now.
`;
const result = await generateAiContent(prompt)
 const  experienceDescription  = result
 return NextResponse.json<ApiResponse>({
    message:"Resume experience Description generated successfully",
    success:true,
    data:{
        experienceDescription
    }
    },{
        status:201
    })


    } catch (error) {
         console.log("error in  generate experience Description api",error)
                return NextResponse.json<ApiResponse>({
                    message:"Something went wrong",
                    success:false
                },{
                
                    status:500
                })
        
    }
}