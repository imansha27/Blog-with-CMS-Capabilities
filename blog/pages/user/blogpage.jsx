import React, { useEffect, useState } from 'react';
import '../../app/globals.css'; 
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Post } from "../../components/Post"

const BlogPage = () => {
    const [posts, setPosts] =useState([]);
    useEffect(()=>{
        const fetchPosts = async()=>{
            const response = await fetch('/api/blogpost');
            const data =await response.json();
            setPosts(data);
        };
        fetchPosts();
    },[])

  return (
    <>
      <Header />
      <div className='posts-container'>
  {Array.isArray(posts) ? (
    posts.map((post) => <PostCard key={post.id} post={post} />)
  ) : (
    <p>No posts available</p>
  )}
</div>

      <Footer />
    </>
  )
}

export default BlogPage;

