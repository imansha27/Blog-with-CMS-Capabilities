import { Header } from "../components/header"
import { Footer } from "../components/footer"

export default function Home() {
  return (
    // login form
    <>
    <div className="container mx-auto min-h-screen flex items-center bg-cyan-100 justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"

              id="username"

              placeholder="Enter your username"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500   
focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"

              placeholder="Enter your password"
              className="mt-1   
block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500   
focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700   
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>

          <div className="text-center">

            <p className="text-sm text-gray-500">
              Don't have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>

    <Footer/>
  
  </>
  
  )
 
  
}
