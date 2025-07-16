import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsersCog, FaFileAlt, FaShieldAlt, FaChartBar, FaUserShield } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bol text-black  text-center mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Applications */}
        <Link to="/dashboard/manage-applications">
          <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaFileAlt className="text-4xl text-blue-600 mb-2" />
            <h2 className="text-lg font-semibold">Manage Applications</h2>
            <p className="text-sm text-gray-600">Approve or reject insurance policy applications.</p>
          </div>
        </Link>

        {/* Manage Users */}
        <Link to="/dashboard/manage-users">
          <div className="bg-green-100 hover:bg-green-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaUsersCog className="text-4xl text-green-600 mb-2" />
            <h2 className="text-lg font-semibold">Manage Users</h2>
            <p className="text-sm text-gray-600">Promote users to admins or agents and manage roles.</p>
          </div>
        </Link>

        {/* Manage Policies */}
        <Link to="/dashboard/manage-policies">
          <div className="bg-yellow-100 hover:bg-yellow-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaShieldAlt className="text-4xl text-yellow-600 mb-2" />
            <h2 className="text-lg font-semibold">Manage Policies</h2>
            <p className="text-sm text-gray-600">Add, update, or remove life insurance policies.</p>
          </div>
        </Link>

        {/* Manage Transactions */}
        <Link to="/dashboard/manage-transactions">
          <div className="bg-purple-100 hover:bg-purple-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaChartBar className="text-4xl text-purple-600 mb-2" />
            <h2 className="text-lg font-semibold">Transactions</h2>
            <p className="text-sm text-gray-600">View and track all payments and earnings.</p>
          </div>
        </Link>

        {/* Manage Agents */}
        <Link to="/dashboard/manage-agents">
          <div className="bg-red-100 hover:bg-red-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaUserShield className="text-4xl text-red-600 mb-2" />
            <h2 className="text-lg font-semibold">Manage Agents</h2>
            <p className="text-sm text-gray-600">Approve new agents and demote existing ones.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
