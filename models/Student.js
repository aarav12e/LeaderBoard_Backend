import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    roll: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, default: 0 },
    linkedin: { type: String, default: "", trim: true },
    github: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);