import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardHome = () => {
  const cards = [
    {
      title: 'Manage Applications',
      description: 'View and handle insurance applications',
      link: '/dashboard/manage-applications',
      color: 'bg-blue-500',
    },
    {
      title: 'Manage Users',
      description: 'Control user roles and accounts',
      link: '/dashboard/manage-users',
      color: 'bg-green-500',
    },
    {
      title: 'Manage Policies',
      description: 'Add, update, or remove insurance policies',
      link: '/dashboard/manage-policies',
      color: 'bg-purple-500',
    },
    {
      title: 'Manage Transactions',
      description: 'View and track payment transactions',
      link: '/dashboard/manage-transactions',
      color: 'bg-yellow-500',
    },
    {
      title: 'Manage Agents',
      description: 'Approve, reject, or manage insurance agents',
      link: '/dashboard/manage-agents',
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ title, description, link, color }) => (
          <Link
            to={link}
            key={title}
            className={`p-6 rounded-lg shadow-lg text-white hover:scale-105 transform transition-all duration-300 ${color}`}
          >
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm opacity-90">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
