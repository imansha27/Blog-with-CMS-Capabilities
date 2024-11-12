import React, { useEffect, useState } from 'react';
import '../../app/globals.css'; 
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Post from "../../components/Post";

const  Adashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/admin.js', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseText = await response.text(); // Get response as text for debugging
      console.log('Response:', responseText); 

      // If response is empty, you can handle that gracefully
      if (!response.ok || !responseText) {
        console.error('Failed to fetch posts or response is empty');
        return;
      }
    
      try {
        const data = JSON.parse(responseText); // Parse manually to catch errors
        setPosts(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {Array.isArray(posts) && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <Footer />
    </>
  );
}  

export default Adashboard;
