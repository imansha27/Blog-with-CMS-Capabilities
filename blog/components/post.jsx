import React from 'react';
import { useRouter } from 'next/router'; // import useRouter

const Post = ({ post }) => {
  const router = useRouter(); // initialize the router

  const navigateToPost = () => {
    // Navigate to the ReadPost page with the post ID
    router.push(`/user/readpost/${post.id}`);
  };


  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
      <img
        className="rounded-t-lg w-full h-48 object-cover"
        src="https://via.placeholder.com/300" 
        alt={post.title}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-600 text-base mb-4">{post.content.substring(0, 100)}...</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="post-author">By: {post.authorName}</span>
        </div>
      
        <button
         onClick={() => navigateToPost(post.id)} 
          className=" bg-slate-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        
        >
          Read More
        </button>
      </div>
      </div>
    
  );
};

export default Post;
