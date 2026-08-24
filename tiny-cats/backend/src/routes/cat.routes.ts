import express,{type Request,type Response} from "express"
import { createCatController, getAllCatsController, getCatByIdController, recommendCatsController, searchCatsController } from "../controller/cat.controller.ts";

const router = express.Router();


router.post("/create",createCatController)
router.post("/search/all",searchCatsController)
router.get("/",getAllCatsController)
router.get("/:id",getCatByIdController)
router.post("/recommend",recommendCatsController)





router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Tiny cats Backend running"
    })
})

export default router