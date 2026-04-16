import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: String,
    videoUrl: String,
    duration: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);