"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      alert("Registered Successfully");
      router.push("/login");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto bg-slate-400 p-8 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-500"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-500"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-500"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button className="w-full bg-green-600 py-3 rounded-xl cursor-pointer">
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </form>
    </main>
  );
}