import React, { useEffect, useState } from 'react';
import '../../app/globals.css'; 
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  // Function to navigate to createpost page
  const navigateToCreatePost = () => {
    router.push('/user/createpost');
  };

  // Fetch user posts based on userId
  useEffect(() => {

    const token = localStorage.getItem("token");
    
      const parsedToken = JSON.parse(token);
       const userId = parsedToken.user.id; 
       console.log(userId);
    if (userId) {
      fetch(`/api/blogpost?userId=${userId}`)
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



  //delete button function

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/blogpost`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId }),
      });

      if (response.ok) {
        // Remove the deleted post from state
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        alert("Post deleted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete post:", errorData.error);
        alert("Error deleting post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post. Please try again.");
    }
  };


  return (
    <>
      <Header />
      
      <button 
        onClick={navigateToCreatePost}
        className="absolute top-[100px] right-5 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        Create Post
      </button>

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
                  <button className="text-blue-500 hover:text-blue-700 mr-4">Edit</button>
                  <button 
                    onClick={() => handleDelete(post.id)} 
                    className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
