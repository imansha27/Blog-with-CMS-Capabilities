import React from 'react';
import { useRouter } from 'next/router'; // to navigate to the individual post page

const Post = ({ post }) => {
  const router = useRouter();

  // Handle navigation to the full post details page
  const handleReadMore = () => {
    router.push(`/post/${post.id}`); // Navigate to the post detail page
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
      <img
        className="rounded-t-lg w-full h-48 object-cover"
        src="https://via.placeholder.com/300" // You can replace this with an image source from your post data
        alt={post.title}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-600 text-base mb-4">{post.content.substring(0, 100)}...</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="post-author">By: {post.authorName}</span>
        </div>
        <button
          onClick={handleReadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default Post;
