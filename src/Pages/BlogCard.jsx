import React from 'react';

export default function BlogCard({ blog, onReadMore }) {
  const shortDetails = blog.details.split(' ').slice(0, 25).join(' ') + '...';

  return (
    <div className="card p-4 border rounded shadow-md mb-6">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 text-xl font-bold">{blog.title}</h3>
      <p className="text-gray-700 mt-1">{shortDetails}</p>
      
      <div className="flex items-center mt-3 space-x-3">
        {blog.author.profileImg && (
          <img
            src={blog.author.profileImg}
            alt={blog.author.name}
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">{blog.author.name}</span>
      </div>

      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
        <span>Visits: {blog.visitCount}</span>
      </div>

      <button
        onClick={() => onReadMore(blog.id)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Read More
      </button>
    </div>
  );
}
