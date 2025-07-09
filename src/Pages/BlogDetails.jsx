import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function BlogDetails() {
  const { blogId } = useParams();

  const { data: blog, isLoading } = useQuery(['blog', blogId], () =>
    fetch(`/api/blogs/${blogId}`).then(res => res.json())
  );

  if (isLoading) return <p>Loading blog details...</p>;

  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover rounded mb-6" />
      <p className="mb-6 whitespace-pre-line">{blog.details}</p>

      <div className="flex items-center space-x-4">
        {blog.author.profileImg && (
          <img
            src={blog.author.profileImg}
            alt={blog.author.name}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{blog.author.name}</p>
          <p className="text-sm text-gray-500">
            Published on {new Date(blog.publishedDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">Total visits: {blog.visitCount}</p>
        </div>
      </div>
    </div>
  );
}
