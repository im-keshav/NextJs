import mongoose, { Schema } from "mongoose";
import type { Icat } from "../types/cats.types.ts";

const catSchema = new mongoose.Schema<Icat>({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    breed:{
        type:String,
        required:true,
        trim:true
    },
    description: {
        type: String,
        required: true,
    },
    kidsFriendly: {
        type: Boolean,
        required: true,
    },
    apartmentFriendly: {
        type: Boolean,
        required: true,
    },
    lifespan: {
        type: Number,
        required: true,
    },
    energyLevel: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
},{
    timestamps:true
})

const CatModel = mongoose.model("Cat", catSchema)

export default CatModel