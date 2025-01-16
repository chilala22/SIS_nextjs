"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./globals.css";
import { AuthProvider,useAuth } from "./AuthContext";
import Home from './page';

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth(); 
  const router = useRouter();

  const handleLogout = () => {
    logout(); 
    router.push("/login"); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">School Management</h1>
          <ul className="flex space-x-4">
            {!isAuthenticated ? (
              <>
               <Link href="/" className="text-white hover:underline">
                    Home
                  </Link>
                <li>
                  <Link href="/signup" className="text-white hover:underline">
                    Signup
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-white hover:underline">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
               <li>
                  <Link href="/" className="text-white hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/filterStudent" className="text-white hover:underline">
                    Filter Students
                  </Link>
                </li>
                <li>
                  <Link href="/manageStudent" className="text-white hover:underline">
                    Manage Students
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="text-white hover:underline">
                    Analytics
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:underline"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} School Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="antialiased">
          <Layout>{children}</Layout>
        </body>
      </html>
    </AuthProvider>
  );
}
