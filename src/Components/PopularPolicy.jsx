import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';

const PopularPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/policies/popular`)
      .then((res) => {
        setPolicies(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch popular policies:', err);
      });
  }, [BACKEND_URL]);

  return (
    <div className="py-18 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center text-gray-900 dark:text-white font-bold mb-8">
          Popular <span className="text-purple-700">Policies</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-base-100 border-base-300 rounded-lg p-6 shadow-2xl hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {policy.title}
              </h3>
              <p className="mb-1 text-gray-800 dark:text-gray-300">
                <strong className="text-gray-700 dark:text-gray-200">Coverage:</strong>{' '}
                {policy.coverage || 'N/A'}
              </p>
              <p className="mb-1 text-gray-800 dark:text-gray-300">
                <strong className="text-gray-700 dark:text-gray-200">Term:</strong>{' '}
                {policy.termLength || 'N/A'}
              </p>
              <p className="mb-4 text-gray-800 dark:text-gray-300">
                <strong className="text-gray-700 dark:text-gray-200">Visits:</strong>{' '}
                {policy.visits || 0}
              </p>
              <button
                onClick={() => navigate(`/policy/${policy._id}`)}
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded hover:opacity-90"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPolicies;
