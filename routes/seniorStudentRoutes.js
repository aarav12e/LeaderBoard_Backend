import express from "express";
import {
  getSeniorLeaderboard,
  addSeniorStudent,
  deleteSeniorStudent,
  updateSeniorStudent,
} from "../controllers/SeniorStudentController.js";
import { requireSeniorAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public senior leaderboard read
router.get("/", getSeniorLeaderboard);

// Protected senior admin mutations
router.post("/", requireSeniorAdmin, addSeniorStudent);
router.put("/:id", requireSeniorAdmin, updateSeniorStudent);
router.delete("/:id", requireSeniorAdmin, deleteSeniorStudent);

export default router;
