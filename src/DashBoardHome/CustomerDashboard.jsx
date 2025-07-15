import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileSignature, FaCalculator, FaStar } from 'react-icons/fa';

const CustomerDashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Applied Policies */}
        <Link to="/dashboard/my-policies">
          <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaFileSignature className="text-4xl text-blue-600 mb-2" />
            <h2 className="text-lg font-semibold">My Policies</h2>
            <p className="text-sm text-gray-600">View your applied insurance policies and their statuses.</p>
          </div>
        </Link>

        {/* Premium Quote Estimator */}
        <Link to="/quote">
          <div className="bg-green-100 hover:bg-green-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaCalculator className="text-4xl text-green-600 mb-2" />
            <h2 className="text-lg font-semibold">Get a Quote</h2>
            <p className="text-sm text-gray-600">Estimate your premium based on age, coverage, and more.</p>
          </div>
        </Link>

        {/* Reviews */}
        <Link to="/dashboard/my-reviews">
          <div className="bg-yellow-100 hover:bg-yellow-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaStar className="text-4xl text-yellow-500 mb-2" />
            <h2 className="text-lg font-semibold">My Reviews</h2>
            <p className="text-sm text-gray-600">Share your feedback about policies you’ve used.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboard;
