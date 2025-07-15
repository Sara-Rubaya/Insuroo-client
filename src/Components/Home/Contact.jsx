// Contact.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log('Contact Form Data:', data);
    Swal.fire('Message Sent!', 'We will get back to you soon.', 'success');
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            {...register('name', { required: true })}
            className="p-3 border rounded w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            {...register('email', { required: true })}
            className="p-3 border rounded w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Subject"
          {...register('subject', { required: true })}
          className="p-3 border rounded w-full"
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          {...register('message', { required: true })}
          className="p-3 border rounded w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
