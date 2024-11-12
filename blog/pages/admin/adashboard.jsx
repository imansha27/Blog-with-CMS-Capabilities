import React, { useEffect, useState } from 'react';
import '../../app/globals.css'; 
import { useRouter } from 'next/router';

const adashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);


  // Fetch user posts based on userId
  useEffect(() => {

    const token = localStorage.getItem("token");
    
      const parsedToken = JSON.parse(token);
       const userId = parsedToken.user.id; 
       console.log(userId);
    if (userId) {
      fetch(`/api/admin?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error(data.error);
          } else {
            setPosts(data); // Set posts in state
          }
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, []);



  //reject button function

 
const handlereject = async (postId) => {
  try {
    const response = await fetch(`/api/admin`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: postId, status: 'rejected' }), 
    });

    if (response.ok) {
      // Remove the rejected post from state
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      alert("Post rejected successfully!");
    } else {
      const errorData = await response.json();
      console.error("Failed to reject post:", errorData.error);
      alert("Error rejecting post. Please try again.");
    }
  } catch (error) {
    console.error("Error rejecting post:", error);
    alert("Error rejecting post. Please try again.");
  }
};


//handle approve

const handleapprove = async (postId) => {
  try {
    const response = await fetch(`/api/admin`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: postId, status: 'Approve' }), 
    });

    if (response.ok) {
      // Remove the rejected post from state
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      alert("Post Approved successfully!");
    } else {
      const errorData = await response.json();
      console.error("Failed to reject post:", errorData.error);
      alert("Error approving post. Please try again.");
    }
  } catch (error) {
    console.error("Error Approving post:", error);
    alert("Error Approving post. Please try again.");
  }
};


  return (
    <>
   
      
    

      <div className="mt-20 p-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-b">
                 <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{post.title}</td>
                 <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{post.content}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.authorName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              
                <button 
                    onClick={() =>   handleapprove(post.id)}  className="text-blue-500 hover:text-blue-700 mr-4">Approve</button>
                  <button 
                    onClick={() => handlereject(post.id)} 
                    className="text-red-500 hover:text-red-700">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </>
  );
}

export default adashboard;
