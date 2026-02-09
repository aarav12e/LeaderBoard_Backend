import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
roll: String,
name: String,
points: Number,
linkedin: String,
github: String
});


export default mongoose.model("Student", studentSchema);