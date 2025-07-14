import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingVisit, setLoadingVisit] = useState(false);

  useEffect(() => {
    axios.get('https://insuroo-server.vercel.app/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Failed to fetch blogs:', err));
  }, []);

  const openModal = async (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);

    setLoadingVisit(true);
    try {
      // Increase visit count on backend
      await axios.patch(`https://insuroo-server.vercel.app/blogs/${blog._id}`, {});
    } catch (err) {
      console.error('Failed to increase visit count:', err);
    }
    setLoadingVisit(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const getShortDetails = (text) => {
    if (!text) return '';
    if (text.length <= 30) return text;
    return text.slice(0, 30) + '...';
  };

  // Safely format published date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const dateObj = new Date(dateString);
    return isNaN(dateObj) ? 'Date not available' : dateObj.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="border rounded shadow p-4 flex flex-col">
            <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-3">{getShortDetails(blog.details)}</p>

            <div className="flex items-center mb-3">
              {blog.authorImage && (
                <img
                  src={blog.authorImage}
                  alt={blog.authorName}
                  className="h-8 w-8 rounded-full mr-2 object-cover"
                />
              )}
              <span className="text-sm font-medium">{blog.authorName || 'Unknown'}</span>
              <span className="ml-auto text-xs text-gray-500">{formatDate(blog.publishedAt || blog.publishedDate)}</span>
            </div>

            <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
              <span>Visits: {blog.totalVisit || 0}</span>
            </div>

            <button
              onClick={() => openModal(blog)}
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={loadingVisit && selectedBlog?._id === blog._id}
            >
              {loadingVisit && selectedBlog?._id === blog._id ? 'Loading...' : 'Read More'}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedBlog && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div
      className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative max-h-[80vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-xl font-bold"
        aria-label="Close modal"
      >
        &times;
      </button>

      <img
        src={selectedBlog.image}
        alt={selectedBlog.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
      
      <p className="mb-4 italic text-gray-600">
        {selectedBlog.shortDescription
          ? selectedBlog.shortDescription
          : getShortDetails(selectedBlog.details)}
      </p>

      <p className="mb-6 whitespace-pre-line">
        {selectedBlog.description || selectedBlog.details}
      </p>

      <div className="flex items-center mb-4">
        {selectedBlog.authorImage && (
          <img
            src={selectedBlog.authorImage}
            alt={selectedBlog.authorName}
            className="h-10 w-10 rounded-full mr-3 object-cover"
          />
        )}
        <div>
          <p className="font-semibold">{selectedBlog.authorName || 'Unknown Author'}</p>
          <p className="text-sm text-gray-500">
            {new Date(selectedBlog.publishedAt || selectedBlog.publishedDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm">Total Visits: {selectedBlog.totalVisit || 0}</p>
    </div>
  </div>
)}

    </div>
  );
};

export default Blog;
