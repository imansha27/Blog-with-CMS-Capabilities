"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email) {
      alert ("Both username and email are required");
      return;
    }

  

    // Implement authentication 
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email }),
    });

    const data = await response.json();

    if (data.success) {
      
        const data = await response.json();
        const token =data.data.token;
        localStorage.setItem('token', token);
        console.log(data.data.token);

        alert('Login successful!');
      router.push("/dashboard");

    } else {
      // Show error if authentication fails
      alert (data.message || "Login failed. Please try again.");
   
    }
  }

  return (
    <>
     
      <div className="container mx-auto min-h-screen flex items-center bg-cyan-100 justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

         

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/blogpage" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
     
    </>
  );
}
