// AddBlog.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const AddBlog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const blogData = {
        title: data.title,
        image: data.image,
        shortDescription: data.shortDescription,
        description: data.description,
        authorName: user?.displayName || 'Anonymous',
      };

      const res = await axiosSecure.post('/blogs', blogData);
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Blog added successfully!', 'success');
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to add blog', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('title', { required: true })}
          className="w-full p-2 border rounded"
          placeholder="Blog Title"
        />
        <input
          {...register('image', { required: true })}
          className="w-full p-2 border rounded"
          placeholder="Image URL"
        />
        <input
          {...register('shortDescription', { required: true })}
          className="w-full p-2 border rounded"
          placeholder="Short Description"
        />
        <textarea
          {...register('description', { required: true })}
          className="w-full p-2 border rounded"
          placeholder="Full Blog Content"
          rows={5}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
