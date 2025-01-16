"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 bg-purple-800 text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to School Management System</h1>
        <p className="text-lg mb-6">
          Simplifying school administration and student management with ease.
        </p>
        <Link
          href="/manageStudent"
          className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Get Started
        </Link>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Student Management</h3>
            <p className="text-gray-600">
              Easily add, edit, and manage student records all in one place.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">
              Get detailed insights and reports on student performance.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-600">
              Your data is safe with our secure login and authentication system.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center py-12 bg-gray-200 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Simplify School Management?</h2>
        <p className="text-lg mb-6">
          Sign up now and start managing your school effortlessly.
        </p>
        
      </section>
    </div>
  );
}
