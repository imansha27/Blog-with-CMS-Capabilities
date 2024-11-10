import React from 'react';

const posts = [
  {
    image: 'https://example.com/image1.jpg',
    title: 'Post 1 Title',
  },
  {
    image: 'https://example.com/image2.jpg',
    title: 'Post 2 Title',
  },
  {
    image: 'https://example.com/image3.jpg',
    title: 'Post 3 Title',
  },
];

export const Post = () => {
  return (
    <div className="container mx-auto pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200" // Added border with subtle gray color
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-lg font-bold mt-4">{post.title}</h2>
            {/* Add "Read More" button with styling */}
            <button className="bg-black text-white py-2 px-4 rounded-md focus:outline-none hover:bg-gray-800">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};