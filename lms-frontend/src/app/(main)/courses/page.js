"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Link from "next/link";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data);
      } catch (err) {
        alert("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">All Courses</h1>

        {loading && <p>Loading courses...</p>}

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-slate-400 p-5 rounded-2xl"
            >
              <h2 className="text-xl font-bold mb-2">
                {course.title}
              </h2>

              <p className="text-slate-900 text-sm mb-4">
                {course.description}
              </p>

              <Link
                href={`/courses/${course._id}`}
                className="bg-blue-600 px-4 py-2 rounded-xl inline-block"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
}