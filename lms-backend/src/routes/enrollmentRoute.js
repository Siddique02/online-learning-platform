import express from "express";
import Enrollment from "../models/Enrollment.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Enroll in a course
router.post("/:courseId", protect, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can enroll" });
    }

    const exists = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.courseId
    });

    if (exists) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: req.params.courseId
    });

    res.status(201).json(enrollment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all courses the student is enrolled in
router.get("/my-courses", protect, async (req, res) => {
  try {
    const courses = await Enrollment.find({
      student: req.user._id
    }).populate("course");

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;