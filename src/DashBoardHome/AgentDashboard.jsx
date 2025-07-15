import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaTasks } from 'react-icons/fa';

const AgentDashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Agent Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Assigned Customers */}
        <Link to="/dashboard/assigned-customers">
          <div className="bg-cyan-100 hover:bg-cyan-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaUserFriends className="text-4xl text-cyan-600 mb-2" />
            <h2 className="text-lg font-semibold">Assigned Customers</h2>
            <p className="text-sm text-gray-600">View and manage your assigned customer applications.</p>
          </div>
        </Link>

        {/* Task / Status Management */}
        <Link to="/dashboard/manage-status">
          <div className="bg-emerald-100 hover:bg-emerald-200 transition rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <FaTasks className="text-4xl text-emerald-600 mb-2" />
            <h2 className="text-lg font-semibold">Manage Status</h2>
            <p className="text-sm text-gray-600">Update application statuses (Approve/Reject).</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AgentDashboard;
