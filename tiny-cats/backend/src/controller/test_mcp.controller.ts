import generateAiResponse from "../services/gemini.service.ts";
import { getMcpClient } from "../services/mcp.service.ts"
import type {Request,Response } from "express";

const testMcpController = async (req:Request,res:Response)=>{
    try{
        const client = await getMcpClient();

        const tools = await client.listTools();


        const kidsFriendly = req.body?.kidsFriendly !== undefined ? Boolean(req.body.kidsFriendly) : req.query?.kidsFriendly === 'true';
        const apartmentFriendly = req.body?.apartmentFriendly !== undefined ? Boolean(req.body.apartmentFriendly) : req.query?.apartmentFriendly === 'true';

        const result = await client.callTool({
            name: "recommend_cats",
            arguments: {
                kidsFriendly,
                apartmentFriendly,
            }
        });

        let contentArray = result.content as Array<{ type: string; text?: string }>;
        let catsData = contentArray[0]?.text || "";
        let prompt =`
        
        Available Cats

        ${catsData}

        recommend the best cat from this data

        give me short and sweet description of the cat
        
        `
        let aiResponse = await  generateAiResponse(prompt)
         

        return res.json({
            success:true,

            data:aiResponse
        });
    }catch(err){
        return res.json({err});
    }
}

export default testMcpController;