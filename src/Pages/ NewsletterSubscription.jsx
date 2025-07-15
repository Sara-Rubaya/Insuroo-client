import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const NewsletterSubscription = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://insuroo-server.vercel.app/newsletter', formData);
      if (res.data.insertedId) {
        Swal.fire('Subscribed!', 'Thank you for subscribing.', 'success');
        setFormData({ name: '', email: '' });
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Subscribe to Our <span className="text-pink-600">Newsletter</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
