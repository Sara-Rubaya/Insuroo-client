import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router';

const PopularPolicies = () => {
  const [popularPolicies, setPopularPolicies] = useState([]);

  useEffect(() => {
    axios.get('https://insuroo-server.vercel.app/policies/popular')
      .then(res => setPopularPolicies(res.data))
      .catch(err => console.error('Error fetching popular policies:', err));
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Popular <span className="text-pink-600">Policies</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularPolicies.map(policy => (
            <div
              key={policy._id}
              className="rounded-lg p-6 shadow border bg-white dark:bg-gray-800 flex flex-col justify-between"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {policy.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                💵 Coverage: <span className="font-medium">{policy.coverageAmount}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                📆 Duration: <span className="font-medium">{policy.termDuration}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ⭐ Popularity: <span className="font-medium">{policy.visits || 0} visits</span>
              </p>

              <Link
                to={`/policy/${policy._id}`}
                className="mt-auto bg-pink-600 text-white text-center px-4 py-2 rounded hover:bg-pink-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPolicies;
