import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router';


export default function BlogsPage() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all blogs with new React Query v5 object syntax
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => fetch('/api/blogs').then(res => res.json())
  });

  // Mutation to increase visit count (React Query v5 style)
  const increaseVisitMutation = useMutation({
    mutationFn: (blogId) => fetch(`/api/blogs/${blogId}/visit`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
    }
  });

  const openModal = (blogId) => {
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return;
    setSelectedBlog(blog);

    // Increase visit count
    increaseVisitMutation.mutate(blogId);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  const goToDetails = (blogId) => {
    closeModal();
    navigate(`/blogs/${blogId}`);
  };

  if (isLoading) return <p>Loading blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blogs & Articles</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} onReadMore={openModal} />
        ))}
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="mb-4">{selectedBlog.details}</p>

            <button
              onClick={() => goToDetails(selectedBlog.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Full Details Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
