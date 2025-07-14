import React from 'react';

import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <FaLock className="text-red-600 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, you don't have permission to access this page.
      </p>
      <Link to="/">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default Forbidden;
