import React from 'react';
import '../../app/globals.css'; 
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useRouter } from 'next/router'; // Import the useRouter hook

const Dashboard = () => {
  const router = useRouter(); 

  // Function to navigate to createpost page
  const navigateToCreatePost = () => {
    router.push('/user/createpost'); // Route to createpost.jsx
  };

  return (
    <>
      <Header />
      
      <button 
        onClick={navigateToCreatePost}
        className="absolute top-[100px] right-5 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        Create Post
      </button>

      <Footer />
    </>
  );
}

export default Dashboard;
