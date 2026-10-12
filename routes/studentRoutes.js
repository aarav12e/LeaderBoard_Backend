import express from "express";
import { getLeaderboard, addStudent, deleteStudent, updateStudent } from "../controllers/StudentController.js";
import { requireJuniorAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public leaderboard read
router.get("/", getLeaderboard);

// Protected admin mutations
router.post("/", requireJuniorAdmin, addStudent);
router.put("/:id", requireJuniorAdmin, updateStudent);
router.delete("/:id", requireJuniorAdmin, deleteStudent);

export default router;