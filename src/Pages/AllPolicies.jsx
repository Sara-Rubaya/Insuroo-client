import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AllPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPolicy, setSelectedPolicy] = useState(null); // 👈 for modal

  const policiesPerPage = 6;
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/policies`)
      .then(res => {
        setPolicies(res.data);
        const cats = ['All', ...new Set(res.data.map(policy => policy.category || 'Uncategorized'))];
        setCategories(cats);
      })
      .catch(err => console.error('Failed to fetch policies:', err));
  }, [BACKEND_URL]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPolicies(policies);
    } else {
      setFilteredPolicies(policies.filter(policy => policy.category === selectedCategory));
    }
    setCurrentPage(1);
  }, [selectedCategory, policies]);

  const indexOfLast = currentPage * policiesPerPage;
  const indexOfFirst = indexOfLast - policiesPerPage;
  const currentPolicies = filteredPolicies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPolicies.length / policiesPerPage);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  // 👇 Read More handler: open modal & increase visit
  const handleReadMore = async (e, policy) => {
    e.stopPropagation();
    try {
      await axios.patch(`${BACKEND_URL}/api/policies/${policy._id}/visit`);
    } catch (error) {
      console.error('Failed to increase visits', error);
    }
    setSelectedPolicy(policy);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-purple-900 text-transparent bg-clip-text">
        All Insurance Policies
      </h1>

      {/* Filter */}
      <div className="mb-6">
        <label htmlFor="category" className="mr-2 font-semibold">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded p-2"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPolicies.map(policy => (
          <div
            key={policy._id}
            className="border rounded-lg shadow hover:shadow-lg cursor-pointer flex flex-col"
          >
            <img
              src={policy.image}
              alt={policy.title}
              className="w-full h-52 object-cover rounded-t-lg"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-1">{policy.title}</h2>
              <p className="text-sm text-gray-500 mb-2 font-medium">
                Category: {policy.category || 'Uncategorized'}
              </p>
              <p className="text-gray-700 mb-4">
                {policy.details.length > 100 ? policy.details.slice(0, 100) + '...' : policy.details}
              </p>
              <button
                onClick={(e) => handleReadMore(e, policy)}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 rounded ${
                pageNum === currentPage ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}

      {/* ✅ Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-2">{selectedPolicy.title}</h2>
            <img
              src={selectedPolicy.image}
              alt={selectedPolicy.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <p className="text-sm text-gray-600 mb-2">Category: {selectedPolicy.category}</p>
            <p className="text-gray-800 mb-4">{selectedPolicy.details}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedPolicy(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Close
              </button>
              <button
                onClick={() => navigate(`/policy/${selectedPolicy._id}`)}
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                Go to Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPolicies;
