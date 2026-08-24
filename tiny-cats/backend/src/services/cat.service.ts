import CatModel from "../models/cat.model.ts"



// Create service
export const createCatService = async(payload:object) =>{
    return await CatModel.create(payload)
}


// All cats service 
export const getAllCatsService = async() =>{
    return await CatModel.find()
}

// Get single cat service
export const getCatByIdService = async(id:string) =>{
    return await CatModel.findById(id)
}

// search cats services
export const searchCatsService = async(query:string) =>{
    return await CatModel.find({
        $or:[
            {name:{$regex:query,$options:"i"}},
            {breed:{$regex:query,$options:"i"}},
            {description:{$regex:query,$options:"i"}},
        ]
    })
}

// recommend cats services
export const recommendCatsService = async(kidsFriendly:boolean,apartmentFriendly:boolean) =>{
    return await CatModel.find({
        kidsFriendly,
        apartmentFriendly,
    })
}



