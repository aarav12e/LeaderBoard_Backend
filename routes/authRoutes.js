import express from "express";
import { juniorLogin, seniorLogin } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/junior-login", juniorLogin);
router.post("/senior-login", seniorLogin);

export default router;

