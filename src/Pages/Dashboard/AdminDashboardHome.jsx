import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Data
  const { data: applications = [] } = useQuery({
    queryKey: ["policyApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/policyApplications");
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users");
      return res.data;
    },
  });

  const { data: policies = [] } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/policies");
      return res.data;
    },
  });

  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/agents");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/payments");
      return res.data;
    },
  });

  // Stats
  const pendingApplications = applications.filter(a => a.status === "Pending").length;
  const approvedApplications = applications.filter(a => a.status === "Approved").length;
  const rejectedApplications = applications.filter(a => a.status === "Rejected").length;

  const adminCount = users.filter(u => u.role === "admin").length;
  const agentCount = users.filter(u => u.role === "agent").length;
  const customerCount = users.filter(u => !u.role || u.role === "customer").length;

  const totalEarnings = payments
    .filter(p => p.status === "Success")
    .reduce((sum, p) => sum + p.amount, 0);

  const chartData = [
    { name: "Jan", earnings: 20000 },
    { name: "Feb", earnings: 35000 },
    { name: "Mar", earnings: 28000 },
    { name: "Apr", earnings: 40000 },
    { name: "May", earnings: 50000 },
    { name: "Jun", earnings: 45000 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Good Morning, Admin 🌞
        </h1>
        <input
          type="text"
          placeholder="Search here..."
          className="mt-4 md:mt-0 border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Applications</h3>
          <p className="text-3xl font-bold">{applications.length}</p>
          <p className="text-sm text-blue-500">Pending: {pendingApplications}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Users</h3>
          <p className="text-3xl font-bold">{users.length}</p>
          <p className="text-sm text-green-500">Admins: {adminCount}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm">Policies</h3>
          <p className="text-3xl font-bold">{policies.length}</p>
          <p className="text-sm text-yellow-500">Active Policies</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Agents</h3>
          <p className="text-3xl font-bold">{agents.length}</p>
          <p className="text-sm text-purple-500">Active Agents</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-cyan-500">
          <h3 className="text-gray-500 text-sm">Total Earnings</h3>
          <p className="text-3xl font-bold">৳{totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-cyan-500">This Month</p>
        </div>
      </div>

      {/* Chart & Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earnings" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Applications Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
          <ul className="divide-y divide-gray-200">
            {applications.slice(0, 5).map(app => (
              <li key={app._id} className="py-3 flex justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-700">{app.personalName}</p>
                  <p className="text-gray-500">{app.email}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    app.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
