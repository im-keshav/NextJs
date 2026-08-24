import express from "express";
import testMcpController from "../controller/test_mcp.controller.ts";

const router = express.Router();

router.get("/test-mcp", testMcpController);
router.post("/test-mcp", testMcpController);


export default router;
