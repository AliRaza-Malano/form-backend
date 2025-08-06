const express = require("express");
const router = express.Router();
const { addStudent, getStudents, getNextID, updateStudent, DeleteStudent } = require("../controllers/studentsController");

router.post("/add", addStudent);
router.get("/all", getStudents);
router.get('/next-id', getNextID);
router.put("/update/:id", updateStudent)
router.delete('/delete/:id', DeleteStudent)

module.exports = router;

