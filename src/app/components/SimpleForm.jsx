"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function SimpleForm() {
  const { data: session } = useSession();

  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // State for stored posts
  const [posts, setPosts] = useState([]);

  // State for loading
  const [loading, setLoading] = useState(false);

  // Fetch posts when component loads
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from database
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      console.log(data);

      // Check what you're actually getting
      console.log("API Response:", data);

      // If data is wrapped in an object, extract the array
      setPosts(Array.isArray(data) ? data : data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]); // Set to empty array on error
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);

    try {
      // Send data to API
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();

        // Add new post to the list
        setPosts([newPost, ...posts]);

        // Clear the form
        setTitle("");
        setDescription("");

        alert("Post saved successfully!");
      } else {
        alert("Failed to save post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Simple Form Example</h1>

      {/* THE FORM */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 border rounded-lg bg-white shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Create a Post</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter description"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Post"}
        </button>
      </form>

      {/* DISPLAY SAVED POSTS */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Saved Posts</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Create one above!</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-700 mt-2">{post.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Created: {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
