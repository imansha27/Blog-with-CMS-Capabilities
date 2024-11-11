import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-snippet">{post.content.substring(0, 100)}...</p> {/* Display first 100 characters */}
      <div className="post-footer">
        <span className="post-author">By: {post.author}</span>
        <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Post;