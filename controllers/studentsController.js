const Students = require("../models/Students");

// Add new member
const addStudent = async (req, res) => {
  try {
    req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    req.body.admissionDate = new Date(req.body.admissionDate);
    const newStudents = new Students(req.body);
    await newStudents.save();
    res.status(201).json({ message: "Students added", students: newStudents });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all members
const getStudents = async (req, res) => {
  try {
    const student = await Students.find();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get next student ID
const getNextID = async (req, res) => {
  try {
    const lastStudent = await Students.findOne().sort({ studentId: -1 });
    const nextId = lastStudent ? lastStudent.studentId + 1 : 1;
    res.json({ nextStudentId: nextId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch next student ID', error });
  }
};
// Update student by ID
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const DeleteStudent = async (req, res) => {
  try {
    await Students.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err });
  }
};



module.exports = { addStudent, getStudents, getNextID, updateStudent, DeleteStudent };
