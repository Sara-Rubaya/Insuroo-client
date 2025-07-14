import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('https://insuroo-server.vercel.app/blogs')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error('Failed to fetch blogs:', err));
  }, []);

  const openModal = async (blog) => {
    try {
      // 1. Increase visit count
      await axios.patch(`https://insuroo-server.vercel.app/blogs/${blog._id}`);

      // 2. Fetch updated blog from server
      const res = await axios.get(`https://insuroo-server.vercel.app/blogs/${blog._id}`);
      setSelectedBlog(res.data);
      setIsModalOpen(true);

      // 3. Update local state for totalVisit (optional, for UI sync)
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b._id === blog._id ? { ...b, totalVisit: (b.totalVisit || 0) + 1 } : b
        )
      );
    } catch (err) {
      console.error('Error updating visit count or fetching blog:', err);
    }
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  const getShortText = (text) => {
    if (!text) return '';
    return text.length > 30 ? text.slice(0, 30) + '...' : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-6 text-center"><span className='text-pink-600'>Blogs</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded shadow p-4 flex flex-col">
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-3">{getShortText(blog.shortDescription)}</p>

            <div className="flex items-center mb-3">
              {blog.authorImage && (
                <img
                  src={blog.authorImage}
                  alt={blog.authorName}
                  className="h-8 w-8 rounded-full mr-2 object-cover"
                />
              )}
              <span className="text-sm font-medium">{blog.authorName || 'Unknown Author'}</span>
              <span className="ml-auto text-xs text-gray-500">
                {formatDate(blog.publishedAt || blog.publishedDate)}
              </span>
            </div>

            <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
              <span>Total Visits: {blog.totalVisit || 0}</span>
            </div>

            <button
              onClick={() => openModal(blog)}
              className="mt-auto bg-pink-600 hover:bg-pink-800 text-white px-4 py-2 rounded"
            >
              Read More
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
            className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
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
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <p className="text-gray-700 mb-4">{selectedBlog.description}</p>

            <div className="flex items-center mb-2">
              {selectedBlog.authorImage && (
                <img
                  src={selectedBlog.authorImage}
                  alt={selectedBlog.authorName}
                  className="h-10 w-10 rounded-full mr-3 object-cover"
                />
              )}
              <div>
                <p className="font-semibold">{selectedBlog.authorName || 'Unknown'}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(selectedBlog.publishedAt || selectedBlog.publishedDate)}
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mt-2">
              Total Visits: {selectedBlog.totalVisit || 0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
