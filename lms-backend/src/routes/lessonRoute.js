import express from "express";
import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Create a new lesson
router.post("/:courseId", protect, async (req, res) => {
  try {
    const { title, videoUrl, duration } = req.body;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can add lessons" });
    }

    const lesson = await Lesson.create({
      title,
      videoUrl,
      duration,
      course: req.params.courseId
    });

    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all lessons for a course
router.get("/:courseId", async (req, res) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.courseId
    });

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;