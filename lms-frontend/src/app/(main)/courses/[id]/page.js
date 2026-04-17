"use client";

import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function CourseDetail() {
  const [lessons, setLessons] = useState([]);
  const [role, setRole] = useState("");
  const params = useParams();
  const courseId = params.id;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.role);
  }, []);

  // Fetch lessons
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/lessons/${courseId}`);
        setLessons(res.data);
      } catch (err) {
        alert("Failed to load lessons");
      }
    };

    fetchData();
  }, [courseId]);

  // Enroll in course
  const enroll = async () => {
    try {
      await api.post(`/enrollments/${courseId}`);
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Already enrolled");
    }
  };

  return (
    <ProtectedRoute>
      <main className="p-8">
        {role === "student" && (
          <button
            onClick={enroll}
            className="bg-green-600 px-4 py-2 rounded-xl mb-6 cursor-pointer"
          >
            Enroll in Course
          </button>
        )}

        <h1 className="text-3xl font-bold mb-6">Course Lessons</h1>

        <div className="mb-6">
          {role === "instructor" && (
            <Link
              href={`/lessons/create`}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Create Lesson
            </Link>
          )}
        </div>

        <div className="space-y-6">
          {lessons.length === 0 ? (
            <div>No lessons available for this course. Ask your instructor to create some.</div>
          ) : (
            lessons.map((lesson) => (
              <div key={lesson._id} className="bg-slate-400 p-5 rounded-2xl">
                <h2 className="text-xl font-bold mb-3">{lesson.title}</h2>

                <video
                  controls
                  className="w-full rounded-xl"
                  src={lesson.videoUrl}
                />
              </div>
            ))
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
