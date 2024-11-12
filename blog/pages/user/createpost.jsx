import React, { useState } from 'react';
import '../../app/globals.css'; 
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useRouter } from 'next/router';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const router = useRouter();

  // Function to handle form submission (Save button)
  const handleSave = (e) => {
    e.preventDefault();
    
    // Retrieve the token from localStorage and parse it
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);
      const authorId = parsedToken.user.id; 

      if (title && content) {
       
        const postData = {
          title,
          content,
          authorId,  // Include authorId in the post data
        };
        console.log("Post saved:", postData);
        alert("The post was saved Successfully!")
        
        // Optionally, redirect after saving the post
        // router.push('/user/dashboard');
      } else {
        alert("Please fill out both title and content.");
      }
    } else {
      alert("You are not logged in. Please log in first.");
    }
  };

  // Function to handle going back (Go Back button)
  const handleGoBack = () => {
    router.back(); 
  };

  return (
    <>
      <Header />
      
      <div className="max-w-4xl mx-auto p-8 bg-teal-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Create a New Post</h1>

        <form onSubmit={handleSave}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-lg font-medium mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              rows="5"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Save
            </button>
            <button type="button" onClick={handleGoBack} className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Go Back
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreatePost;
