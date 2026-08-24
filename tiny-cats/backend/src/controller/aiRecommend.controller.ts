import { type Response, type Request } from "express"
import { aiRecommendService } from "../services/aiRecommend.service.ts";
import { count } from "node:console";


const aiRecommendController = async(req:Request,res:Response)=>{

    const {kidsFriendly,apartmentFriendly} = req.body;
    const result = await aiRecommendService(kidsFriendly,apartmentFriendly);
    

    return res.status(200).json({
        success:true,
        count: Array.isArray(result) ? result.length : 0,
        data:result,
        message:"Cats recommended successfully"
    })
}

export default aiRecommendController;