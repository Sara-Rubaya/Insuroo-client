import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';

const PolicyDetails = () => {
  const { user } = useContext(AuthContext);
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
      alert('Consultation request submitted!');
      setConsultationMessage('');
    }
  };

  if (!policy) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-5xl text-center font-bold mb-12 text-pink-600">{policy.title}</h1>

      {policy.image && (
        <img
          src={policy.image}
          alt={policy.title}
          className="w-full h-96 object-cover rounded-xl mb-6 shadow"
        />
      )}

      {/* === Info Section === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl shadow text-gray-800 mb-8">
        <p><strong>Category:</strong> {policy.category || 'N/A'}</p>
        <p><strong>Coverage:</strong> {policy.coverage || policy.coverageRange || 'N/A'}</p>
        <p><strong>Minimum Age:</strong> {policy.minAge || 'N/A'}</p>
        <p><strong>Maximum Age:</strong> {policy.maxAge || 'N/A'}</p>
        <p><strong>Duration:</strong> {policy.durationOptions || policy.termLength || 'N/A'}</p>
        <p><strong>Eligibility:</strong> {policy.eligibility || 'N/A'}</p>
        <p><strong>Benefits:</strong> {policy.benefits || 'N/A'}</p>
        <p><strong>Premium Calculation:</strong> {policy.premiumCalculation || 'N/A'}</p>
        <p><strong>Base Premium Rate:</strong> {policy.basePremiumRate || 'N/A'}</p>
        <p><strong>Author:</strong> {policy.author || 'N/A'}</p>
        <p><strong>Published Date:</strong> {new Date(policy.publishedDate).toLocaleDateString()}</p>
        <p><strong>Total Visits:</strong> {policy.visits || 0}</p>
      </div>

      {/* === Description === */}
      {policy.description && (
        <div className="mb-8 text-gray-700">
          <h3 className="text-xl font-semibold mb-2">Full Description:</h3>
          <p>{policy.description}</p>
        </div>
      )}

      {policy.details && (
        <div className="mb-8 text-gray-700">
          <h3 className="text-xl font-semibold mb-2">Details:</h3>
          <p>{policy.details}</p>
        </div>
      )}

      {/* === Action Buttons === */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => (user ? navigate('/quote') : navigate('/login'))}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded"
        >
          Get Quote
        </button>

        <form onSubmit={handleConsultationSubmit} className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={consultationMessage}
            onChange={(e) => setConsultationMessage(e.target.value)}
            placeholder="Book Agent Consultation"
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-72"
            required
          />
         <Link to={`/dashboard/applyPolicy/${policy._id}`}>
             <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded"
          >
            Book
          </button>
         </Link>
        </form>
      </div>
    </div>
  );
};

export default PolicyDetails;
