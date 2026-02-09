import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import job from "./config/cron.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.use("/api/students", studentRoutes);

job.start();

app.listen(process.env.PORT, () => console.log("Server running"));