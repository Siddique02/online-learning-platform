import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-400 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">
        Online Learning Platform
      </h1>

      <p className="text-slate-900 mb-8">
        Learn from expert instructors
      </p>

      <Link
        href="/courses"
        className="bg-blue-600 px-6 py-3 rounded-xl"
      >
        Browse Courses
      </Link>
    </main>
  );
}