"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.role)
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="bg-slate-400 flex justify-between items-center px-8 py-4">
      <Link href="/" className="text-2xl font-bold">
        LMS
      </Link>

      <div className="space-x-3">
        {role === "instructor" && (
          <Link href="/courses/create" className="cursor-pointer hover:bg-slate-500 py-2 px-3 rounded-xl">
            Create Course
          </Link>
        )}
        {role === "instructor" && (
          <Link href="/lessons/create" className="cursor-pointer hover:bg-slate-500 py-2 px-3 rounded-xl">
            Create Lesson
          </Link>
        )}
        <Link href="/courses" className="cursor-pointer hover:bg-slate-500 py-2 px-3 rounded-xl">Courses</Link>
        <Link href="/dashboard" className="cursor-pointer hover:bg-slate-500 py-2 px-3 rounded-xl">Dashboard</Link>
        <button onClick={logout} className="cursor-pointer bg-red-500 hover:bg-red-700 py-2 px-3 rounded-xl hover:transition-all duration-300">
          Logout
        </button>
      </div>
    </nav>
  );
}