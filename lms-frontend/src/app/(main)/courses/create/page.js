"use client";

import { useState } from "react";
import api from "../../../../lib/api";
import { useRouter } from "next/navigation";

export default function CreateCourse() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/courses", form);
      alert("Course created");
      router.push("/courses");
    } catch (err) {
      alert("Only instructor can create courses");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 bg-slate-400 p-8 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Create Course
      </h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          name="title"
          placeholder="Course Title"
          className="w-full p-3 bg-slate-500 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Course Description"
          className="w-full p-3 bg-slate-500 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-green-600 py-3 rounded-xl cursor-pointer">
          Create
        </button>
      </form>
    </main>
  );
}