import mongoose from "mongoose";

const seniorStudentSchema = new mongoose.Schema(
  {
    roll:     { type: String, required: true, trim: true },
    name:     { type: String, required: true, trim: true },
    year:     { type: Number, enum: [1, 2, 3, 4], required: true },
    points:   { type: Number, default: 0 },
    linkedin: { type: String, default: "", trim: true },
    github:   { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("SeniorStudent", seniorStudentSchema);

