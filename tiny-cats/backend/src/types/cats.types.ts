import type { Document } from "mongoose";


export interface Icat extends Document {
    name: string;
    breed: string,
    description: string,
    kidsFriendly: boolean,
    apartmentFriendly: boolean,
    lifespan: number,
    energyLevel:string,
    imageUrl:string,
    color:string,  

    createdAt?:Date,
    updatedAt?:Date

    

}