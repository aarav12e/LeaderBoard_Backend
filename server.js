import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";


import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/students", studentRoutes);


app.listen(process.env.PORT, () => console.log("Server running"));