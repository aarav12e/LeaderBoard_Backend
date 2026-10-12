import Student from "../models/Student.js";


export const getLeaderboard = async (req, res) => {
    try {
        const students = await Student.find().sort({ points: -1 });

        let rank = 1;
        let lastPoints = null;

        const ranked = students.map((s, index) => {
            if (lastPoints !== s.points) rank = index + 1;
            lastPoints = s.points;
            return { ...s._doc, rank };
        });

        res.json(ranked);
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to fetch students" });
    }
};


export const addStudent = async (req, res) => {
    try {
        const { roll, name, points, linkedin, github } = req.body;

        if (!roll || !name || !roll.trim() || !name.trim()) {
            return res.status(400).json({ message: "Roll Number and Name are required!" });
        }

        const existing = await Student.findOne({ roll: roll.trim() });
        if (existing) {
            return res.status(400).json({ message: `Student with Roll Number '${roll.trim()}' already exists!` });
        }

        const student = await Student.create({
            roll: roll.trim(),
            name: name.trim(),
            points: points !== undefined && points !== "" && !isNaN(Number(points)) ? Number(points) : 0,
            linkedin: linkedin ? linkedin.trim() : "",
            github: github ? github.trim() : ""
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error adding student" });
    }
};


export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error deleting student" });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.roll) updateData.roll = updateData.roll.trim();
        if (updateData.name) updateData.name = updateData.name.trim();
        if (updateData.points !== undefined) updateData.points = Number(updateData.points) || 0;
        if (updateData.linkedin !== undefined) updateData.linkedin = updateData.linkedin.trim();
        if (updateData.github !== undefined) updateData.github = updateData.github.trim();

        const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error updating student" });
    }
};