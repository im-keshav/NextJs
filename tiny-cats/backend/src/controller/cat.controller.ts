import type { Request, Response } from "express"
import { createCatService, getAllCatsService, getCatByIdService, recommendCatsService, searchCatsService } from "../services/cat.service.ts"

export const createCatController =async (req:Request,res:Response)=>{
    let result = await createCatService(req.body)

    return res.status(201).json({
        success:true,
        data:result,
        message:"Cat created successfully"
    })
}

export const getAllCatsController = async(req:Request,res:Response) =>{
    let result = await getAllCatsService()

    return res.status(200).json({
        success:true,
        data:result,
        message:"All cats fetched successfully"
    })
}

export const getCatByIdController = async(req:Request,res:Response)=>{
    let result = await getCatByIdService(req.params.id as string)

    return res.status(200).json({
        success:true,
        data:result,
        message:"Cat fetched successfully"
    })
}

export const searchCatsController = async(req:Request,res:Response)=>{
    const q = req.query.q;
    let result = await searchCatsService(q as string)

    return res.status(200).json({
        success:true,
        data:result,
        message:"Cats searched successfully"
    })
}

export const recommendCatsController = async(req:Request,res:Response)=>{
    const {kidsFriendly,apartmentFriendly} = req.body;
    const result = await recommendCatsService(kidsFriendly,apartmentFriendly)

    return res.status(200).json({
        success:true,
        data:result,
        message:"Cats recommended successfully"
    })
}