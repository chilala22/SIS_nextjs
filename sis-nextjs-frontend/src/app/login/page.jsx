"use client";

import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext"; 

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth(); 
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token); 
      login(); 
      router.push("/"); 
    } catch (error) {
      const errorResponse = error.response?.data?.error || "Login failed.";
      setErrorMessage(errorResponse);
    }
  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">
         <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
           <h1 className="text-2xl font-bold mb-6">Login</h1>
           <form onSubmit={handleLogin}>
             <input
               type="text"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="border px-4 py-2 rounded w-full mb-4"
             />
             <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="border px-4 py-2 rounded w-full mb-4"
             />
             <button
               type="submit"
               className="bg-blue-500 text-white px-4 py-2 rounded w-full"
             >
               Login
             </button>
           </form>
           {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
         </div>
       </div>
  );
}
