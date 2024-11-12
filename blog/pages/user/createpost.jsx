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
  const handleSave = async (e) => {
    e.preventDefault();

    // Retrieve the token from localStorage and parse it
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);
      const authorId = parsedToken.user.id; // Extract authorId from the token

      if (title && content) {
        try {
          // Send a POST request to the API route to save the post
          const response = await fetch('/api/blogpost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              content,
              authorId,  
            }),
          });

          const result = await response.json();

          if (response.ok) {
            console.log("Post saved with ID:", result.postId);
            alert("The post was saved successfully!");
           router.push('/user/dashboard'); 
          } else {
            alert(result.message || "Failed to save the post.");
          }

        } catch (error) {
          console.error("Error saving post:", error);
          alert("There was an error saving the post. Please try again.");
        }
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
      
      <div className="max-w-4xl mx-auto p-8 bg-slate-200 shadow-lg rounded-lg">
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
          <button type="button" onClick={handleGoBack} className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Go Back
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Save
            </button>
            
          </div>
        </form>
      </div>
 &nbsp;
 &nbsp;
 &nbsp;
 &nbsp;
 &nbsp;
      <Footer />
    </>
  );
};

export default CreatePost;
