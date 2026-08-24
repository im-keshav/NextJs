import type { Request, Response } from "express";
import generateAiResponse from "../services/gemini.service.ts";




const askAiController = async (req:Request,res:Response)=>{
   let prompt = req.body.prompt
   
    let result = await generateAiResponse(prompt)

    return res.status(200).json({
        success:true,
        data:result,
        message:"AI response generated successfully"
    })
}

export default askAiController