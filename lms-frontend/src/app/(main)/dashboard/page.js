"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.role);
  }, []);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await api.get("/enrollments/my-courses");
        setEnrollments(res.data);
      } catch (err) {
        alert("Failed to load dashboard");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <main className="p-8">
      {role === "instructor" ? (
        <div className="rounded-xl mb-6">
          <h2 className="text-3xl font-bold mb-6">Instructor Dashboard</h2>
          <Link
            href="/courses/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Create Course
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">My Courses</h1>
          {loading && <p>Loading...</p>}

          <div className="grid md:grid-cols-3 gap-6">
            {enrollments.length === 0 ? (
              <div>You are not enrolled in any courses.</div>
            ) : (
              enrollments.map((item) => (
                <div key={item._id} className="bg-slate-400 p-5 rounded-2xl">
                  <h2 className="text-xl font-bold mb-2">
                    {item.course.title}
                  </h2>

                  <p className="text-slate-900 text-sm mb-4">
                    {item.course.description}
                  </p>

                  <Link
                    href={`/courses/${item.course._id}`}
                    className="bg-blue-600 px-4 py-2 rounded-xl inline-block"
                  >
                    Continue Learning
                  </Link>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </main>
  );
}
