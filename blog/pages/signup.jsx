import '../app/globals.css'; 
import { useState } from 'react';
import { useRouter } from 'next/router'; 

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled out
    if (!name || !email) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        // Redirect user to the login page after signup
        router.push('/');
      }
    } catch (err) {
      console.error('Error signing up:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Create an Account</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/user/blogpage" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
