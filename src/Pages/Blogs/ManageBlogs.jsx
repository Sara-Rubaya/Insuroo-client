// ManageBlogs.jsx
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const ManageBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myBlogs = [], isLoading } = useQuery({
    queryKey: ['myBlogs', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?authorEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
      {myBlogs.length === 0 ? (
        <p>You haven’t posted any blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myBlogs.map((blog) => (
            <div key={blog._id} className="border p-4 rounded shadow">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{blog.shortDescription}</p>
              <p className="text-xs text-gray-500 mb-1">Published At: {new Date(blog.publishedAt).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mb-2">Visits: {blog.totalVisit}</p>
              <Link to={`/dashboard/edit-blog/${blog._id}`} className="text-blue-600 underline text-sm">
                Edit Blog
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
