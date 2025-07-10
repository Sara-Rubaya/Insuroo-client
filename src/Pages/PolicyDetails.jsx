import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [consultationMessage, setConsultationMessage] = useState('');

  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (id) {
      axios.get(`${BACKEND_URL}/api/policies/${id}`)
        .then(res => setPolicy(res.data))
        .catch(err => console.error('Failed to fetch policy:', err));
    }
  }, [id, BACKEND_URL]);

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    if (consultationMessage.trim()) {
      // Placeholder: you can post this to your backend if needed
      alert('Consultation request submitted!');
      setConsultationMessage('');
    }
  };

  if (!policy) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-4">{policy.title}</h1>
      <img
        src={policy.image}
        alt={policy.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <div className="mb-6 space-y-4 text-gray-800">
        <p><span className="font-semibold">Category:</span> {policy.category || 'Uncategorized'}</p>
        <p><span className="font-semibold">Author:</span> {policy.author}</p>
        <p><span className="font-semibold">Published Date:</span> {new Date(policy.publishedDate).toLocaleDateString()}</p>
        <p><span className="font-semibold">Total Visits:</span> {policy.visits}</p>
        <p><span className="font-semibold">Details:</span> {policy.details}</p>
        <p><span className="font-semibold">Eligibility:</span> {policy.eligibility || 'Adults age 18–65 with valid ID and income proof'}</p>
        <p><span className="font-semibold">Benefits:</span> {policy.benefits || 'Financial security, tax benefits, peace of mind for your family'}</p>
        <p><span className="font-semibold">Premium Logic:</span> {policy.premiumLogic || 'Premium = (Sum Assured × Rate) / Term Length'}</p>
        <p><span className="font-semibold">Term Length:</span> {policy.termLength || '10, 15, 20 or 30 years'}</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => navigate('/get-quote')}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2 rounded"
        >
          Get Quote
        </button>
        <form onSubmit={handleConsultationSubmit} className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={consultationMessage}
            onChange={(e) => setConsultationMessage(e.target.value)}
            placeholder="Book Agent Consultation (write message)"
            className="border p-2 rounded w-full md:w-72"
            required
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded"
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default PolicyDetails;
