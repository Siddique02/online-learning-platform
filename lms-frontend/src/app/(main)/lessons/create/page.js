"use client";

import { useState, useEffect } from "react";
import api from "../../../../lib/api";

export default function CreateLesson() {
  const [form, setForm] = useState({
    title: "",
    courseId: "",
  });
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.role);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await api.get("/courses");
      setCourses(res.data);
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Upload video to Cloudinary
  const uploadVideo = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

    if (!result.secure_url) {
      throw new Error("Upload failed");
    }

    return result.secure_url;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a video file");
      return;
    }

    try {
      setUploading(true);

      // 1. upload video
      const videoUrl = await uploadVideo(file);

      // 2. send to backend
      await api.post(`/lessons/${form.courseId}`, {
        title: form.title,
        courseId: form.courseId,
        videoUrl,
      });
      
      alert("Lesson created successfully");

      // reset
      setForm({ title: "", courseId: "" });
      setFile(null);
    } catch (err) {
      console.log(err);
      alert("Only instructor can create lessons");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 bg-slate-400 p-8 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Add Lesson
      </h1>

      <form onSubmit={submit} className="space-y-4">
        {/* Title */}
        <input
          name="title"
          placeholder="Lesson Title"
          className="w-full p-3 bg-slate-500 rounded"
          onChange={handleChange}
          value={form.title}
        />

        {/* Video File */}
        <label className="w-full text-center cursor-pointer p-3 bg-slate-500 hover:bg-slate-600 rounded font-medium inline-block">
          {file ? file.name : "Click to upload video"}
          <input
            key={file ? file.name : "empty"}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="video/*"
            className="hidden"
          />
        </label>

        {/* Course ID */}
        <select
          name="courseId"
          onChange={handleChange}
          className="w-full p-3 bg-slate-500 rounded"
        >

          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          disabled={uploading}
          className="w-full bg-blue-600 py-3 rounded-xl cursor-pointer"
        >
          {uploading ? "Uploading..." : "Add Lesson"}
        </button>
      </form>
    </main>
  );
}