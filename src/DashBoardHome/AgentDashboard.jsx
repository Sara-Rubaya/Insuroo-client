import { useEffect, useState } from "react";
import { FaUsers, FaBlog, FaPlus } from "react-icons/fa";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router";


const AgentDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [assignedCustomers, setAssignedCustomers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Fetch Assigned Customers (applications assigned to this agent)
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/applications/assigned/${user.email}`)
        .then((res) => setAssignedCustomers(res.data))
        .catch((err) => console.error(err));
    }
  }, [axiosSecure, user?.email]);

  // Fetch Blogs created by this agent
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/blogs/agent/${user.email}`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.error(err));
    }
  }, [axiosSecure, user?.email]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-cyan-700">
        Agent Dashboard
      </h1>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Assigned Customers */}
        <Link to="/dashboard/assignedCustomers">
          <div className="bg-cyan-100 hover:bg-cyan-200 transition rounded-2xl p-6 shadow-md flex flex-col justify-center items-center text-center">
            <FaUsers className="text-4xl text-cyan-600 mb-3" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Assigned Customers
            </h2>
            <p className="text-gray-600 mb-2">
              View and manage your assigned customers.
            </p>
            <span className="text-2xl font-bold text-cyan-700">
              {assignedCustomers.length}
            </span>
          </div>
        </Link>

        {/* Manage Blogs */}
        <Link to="/dashboard/manage-blogs">
          <div className="bg-emerald-100 hover:bg-emerald-200 transition rounded-2xl p-6 shadow-md flex flex-col justify-center items-center text-center">
            <FaBlog className="text-4xl text-emerald-600 mb-3" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Manage Blogs
            </h2>
            <p className="text-gray-600 mb-2">
              Edit or delete your published blogs.
            </p>
            <span className="text-2xl font-bold text-emerald-700">
              {blogs.length}
            </span>
          </div>
        </Link>

        {/* Add Blog */}
        <Link to="/dashboard/addBlogs">
          <div className="bg-yellow-100 hover:bg-yellow-200 transition rounded-2xl p-6 shadow-md flex flex-col justify-center items-center text-center">
            <FaPlus className="text-4xl text-yellow-600 mb-3" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Add Blog
            </h2>
            <p className="text-gray-600 mb-2">
              Create a new blog post to share insights.
            </p>
            <span className="text-2xl font-bold text-yellow-700">+</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AgentDashboard;
