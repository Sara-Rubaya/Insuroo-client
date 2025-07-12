import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const BeAnAgent = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/agents`, formData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Application Submitted',
          text: 'Our team will contact you shortly.',
          timer: 2500,
          showConfirmButton: false,
        });

        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          experience: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Agent form submission failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-5xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Become a <span className='text-purple-700'>Insuroo Agent</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Join our team of trusted agents and help people secure their futures.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Experience (in years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Tell us why you'd be a great fit..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-800 text-white py-3 px-6 rounded-lg font-semibold transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default BeAnAgent;
