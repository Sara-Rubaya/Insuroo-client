import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddBlogs = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    shortDescription: '',
    description: '',
    authorName: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Simple validation
    if (!formData.title || !formData.description) {
      Swal.fire('Error', 'Title and Full Description are required', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://insuroo-server.vercel.app/blogs', // তোমার backend URL
        formData,
        {
          withCredentials: true, // যদি তোমার backend JWT বা cookie auth থাকে
        }
      );

      if (response.status === 201) {
        Swal.fire('Success', 'Blog added successfully', 'success');
        setFormData({
          title: '',
          image: '',
          shortDescription: '',
          description: '',
          authorName: '',
        });
      } else {
        Swal.fire('Error', 'Failed to add blog', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Server error while adding blog', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Short Description</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            placeholder="Enter short description"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Full Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={6}
            placeholder="Enter full content"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter author name"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Submitting...' : 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlogs;
