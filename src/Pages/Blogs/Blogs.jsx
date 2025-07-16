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

  const openModal = (blog) => {
    // Immediately increment totalVisit locally for blog in blogs state
    setBlogs((prev) =>
      prev.map((b) =>
        b._id === blog._id
          ? { ...b, totalVisit: (b.totalVisit || 0) + 1 }
          : b
      )
    );

    // Also update selectedBlog with incremented totalVisit to reflect count in modal immediately
    setSelectedBlog({ ...blog, totalVisit: (blog.totalVisit || 0) + 1 });
    setIsModalOpen(true);

    // Send PATCH request to increment visit count on server
    axios
      .patch(`https://insuroo-server.vercel.app/blogs/${blog._id}`)
      .then(() =>
        // Fetch updated blog data to update modal content in case of other changes
        axios.get(`https://insuroo-server.vercel.app/blogs/${blog._id}`)
      )
      .then((res) => {
        setSelectedBlog(res.data);
        // Update blogs state again with fresh data from backend (in case server changed anything else)
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === blog._id ? { ...b, totalVisit: res.data.totalVisit } : b
          )
        );
      })
      .catch((err) =>
        console.error('Error updating visit count or fetching blog:', err)
      );
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
    <section data-aos="fade-right" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-800 dark:text-white">
          <span className="text-pink-600">Blogs</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="rounded-lg p-5 shadow border dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col justify-between h-full"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{blog.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{getShortText(blog.shortDescription)}</p>

              <div className="flex items-center mb-3">
                {blog.authorImage && (
                  <img
                    src={blog.authorImage}
                    alt={blog.authorName}
                    className="h-8 w-8 rounded-full mr-2 object-cover"
                  />
                )}
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {blog.authorName || 'Unknown Author'}
                </span>
                <span className="ml-auto text-xs text-gray-600 dark:text-gray-400">
                  {formatDate(blog.publishedAt || blog.publishedDate)}
                </span>
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Total Visits: {blog.totalVisit || 0}
              </div>

              <button
                onClick={() => openModal(blog)}
                className="mt-auto w-full bg-pink-600 text-white px-4 py-2 rounded"
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedBlog && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={closeModal}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
            }}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>

              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{selectedBlog.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedBlog.description}</p>

              <div className="flex items-center mb-2">
                {selectedBlog.authorImage && (
                  <img
                    src={selectedBlog.authorImage}
                    alt={selectedBlog.authorName}
                    className="h-10 w-10 rounded-full mr-3 object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {selectedBlog.authorName || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(selectedBlog.publishedAt || selectedBlog.publishedDate)}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                Total Visits: {selectedBlog.totalVisit || 0}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
