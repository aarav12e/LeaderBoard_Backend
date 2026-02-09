import express from "express";
import { getLeaderboard, addStudent, deleteStudent, updateStudent } from "../controllers/StudentController.js";


const router = express.Router();


router.get("/", getLeaderboard);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);


export default router;