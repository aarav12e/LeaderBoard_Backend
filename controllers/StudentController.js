import Student from "../models/Student.js";


export const getLeaderboard = async (req, res) => {
    const students = await Student.find().sort({ points: -1 });


    let rank = 1;
    let lastPoints = null;


    const ranked = students.map((s, index) => {
        if (lastPoints !== s.points) rank = index + 1;
        lastPoints = s.points;
        return { ...s._doc, rank };
    });


    res.json(ranked);
};


export const addStudent = async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
};


export const deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
};

export const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Error updating student" });
    }
};