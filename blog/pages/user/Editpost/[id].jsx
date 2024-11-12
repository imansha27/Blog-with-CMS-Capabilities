import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../../app/globals.css'; 
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";

const EditPost = () => {
  const router = useRouter();
  const { postId } = router.query; // Get postId from the route
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch post data by ID 
  useEffect(() => {
    if (postId) {
      fetch(`/api/blogpost/${postId}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error(data.error);
          } else {
            setTitle(data.title); 
            setContent(data.content); 
          }
        })
        .catch(error => console.error('Error fetching post data:', error))
        .finally(() => setLoading(false));
    }
  }, [postId]);

  

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/blogpost`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId, title, content }),
      });

      if (response.ok) {
        alert("Post updated successfully!");
        router.push('/user/dashboard'); // Redirect back to dashboard
      } else {
        const errorData = await response.json();
        console.error("Failed to update post:", errorData.error);
        alert("Error updating post. Please try again.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header />

      <div className="mt-20 p-5">
        <h1 className="text-2xl font-bold mb-5">Edit Post</h1>
        <form onSubmit={handleUpdatePost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows="6"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
          >
            Update Post
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default EditPost;
