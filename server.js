import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import seniorStudentRoutes from "./routes/seniorStudentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import job from "./config/cron.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Leaderboard routes
app.use("/api/students", studentRoutes);
app.use("/api/senior-students", seniorStudentRoutes);

job.start();

app.listen(process.env.PORT, () => console.log("Server running"));