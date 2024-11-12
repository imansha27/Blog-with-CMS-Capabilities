import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../../app/globals.css';
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";

const ReadPost = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Get the post ID from the URL

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return; // If no ID is found in the URL, do not proceed

      const response = await fetch(`/api/blogpost?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseText = await response.text();
      console.log('Response:', responseText);

      if (!response.ok || !responseText) {
        console.error('Failed to fetch post or response is empty');
        return;
      }

      try {
        const data = JSON.parse(responseText);
        setPost(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    fetchPost();
  }, [id]); // Re-fetch if the ID changes

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {post ? (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">{post.title}</h2>
          <p className="text-lg text-gray-700 mb-5 leading-relaxed">{post.content}</p>
          <span className="text-sm text-gray-500 block text-right">By: {post.authorName}</span>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>

    <Footer />
  </>
  
  );
};

export default ReadPost;
