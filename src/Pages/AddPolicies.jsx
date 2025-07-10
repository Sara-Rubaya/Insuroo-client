import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';

const AddPolicy = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [policy, setPolicy] = useState({
    title: '',
    image: '',
    details: '',
    category: '',
    eligibility: '',
    benefits: '',
    termLength: '',
    premiumCalculation: '',
    agentContact: ''
  });

  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleChange = (e) => {
    setPolicy({ ...policy, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to add a policy');
      return;
    }

    const newPolicy = {
      ...policy,
      author: user.displayName || user.email || 'Unknown',
      publishedDate: new Date(),
      visits: 0,
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/policies`, newPolicy);
      if (res.data.insertedId || res.data.acknowledged) {
        await Swal.fire({
          icon: 'success',
          title: 'Policy added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setPolicy({
          title: '',
          image: '',
          details: '',
          category: '',
          eligibility: '',
          benefits: '',
          termLength: '',
          premiumCalculation: '',
          agentContact: ''
        });
      }
    } catch (error) {
      toast.error('Failed to add policy');
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Insurance Policy</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={policy.title}
          onChange={handleChange}
          placeholder="Policy Title"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="image"
          value={policy.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="details"
          value={policy.details}
          onChange={handleChange}
          placeholder="Short Details (20–30 words)"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="category"
          value={policy.category}
          onChange={handleChange}
          placeholder="Category (e.g., Term Life, Senior Plan)"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="eligibility"
          value={policy.eligibility}
          onChange={handleChange}
          placeholder="Eligibility Criteria"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="benefits"
          value={policy.benefits}
          onChange={handleChange}
          placeholder="Key Benefits"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="termLength"
          value={policy.termLength}
          onChange={handleChange}
          placeholder="Term Length (e.g., 10 years)"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="premiumCalculation"
          value={policy.premiumCalculation}
          onChange={handleChange}
          placeholder="Premium Calculation Logic (e.g., age-based)"
          required
          className="w-full border p-2 rounded"
        />

        

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => navigate('/quote')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Get Quote
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPolicy;
