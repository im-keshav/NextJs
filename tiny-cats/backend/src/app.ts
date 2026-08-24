import express, { type Request, type Response } from 'express'
import cors from 'cors'
import catsRoutes from "./routes/cat.routes.ts"
import AiRoutes from "./routes/ai.routes.ts"
import AiRecommendRoutes from "./routes/aiRecommend.routes.ts"
import MCPRoutes from "./routes/test-mcp.routes.ts"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "Tiny cats Backend running"
    })
})



app.use("/api/cats",catsRoutes)
app.use("/api/ai",AiRoutes)
app.use("/api/ai/recommend",AiRecommendRoutes)
app.use("/api/mcp",MCPRoutes)
export default app

//