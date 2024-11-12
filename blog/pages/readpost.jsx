import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../app/globals.css';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

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
      <div className="container mx-auto px-4 py-8">
        {post ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
            <p className="text-gray-600 mb-6">{post.content}</p>
            <span className="text-sm text-gray-500">By: {post.authorName}</span>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReadPost;
