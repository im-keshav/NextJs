import dotenv from "dotenv";
dotenv.config()
import app from "./app.ts";
import connectToDb from "./config/db.ts";


connectToDb()

let Port = process.env.PORT || 3000


app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`)
})