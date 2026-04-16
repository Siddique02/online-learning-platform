import express from "express";
import Course from "../models/Course.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Create a new course (protected route)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    // optional role check (VERY IMPORTANT for LMS)
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can create courses" });
    }

    const course = await Course.create({
      title,
      description,
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all courses (public route)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific course by ID (public route)
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a course (only owner instructor can update)
router.put("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // only owner instructor can update
    if (course.instructor.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a course (only owner instructor can delete)
router.delete("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await course.deleteOne();

    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;