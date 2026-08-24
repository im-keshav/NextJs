import mongoose from "mongoose"

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Connected to mongodb")

    } catch (err) {
        console.log("error while connecting to mongodb", err)
    }
}

export default connectToDb