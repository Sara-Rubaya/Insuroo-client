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
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CustomerDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch customer's applied policies
  const { data: myPolicies = [] } = useQuery({
    queryKey: ["myPolicies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/myPolicies"); // your API endpoint
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

  const pendingPayments = payments.filter(p => p.status === "Pending").length;
  const successPayments = payments.filter(p => p.status === "Success").length;

  const totalEarnings = payments
    .filter(p => p.status === "Success")
    .reduce((sum, p) => sum + p.amount, 0);

  const chartData = [
    { name: "Jan", payments: 12000 },
    { name: "Feb", payments: 18000 },
    { name: "Mar", payments: 15000 },
    { name: "Apr", payments: 20000 },
    { name: "May", payments: 25000 },
    { name: "Jun", payments: 22000 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome Back 🌟
        </h1>
        <input
          type="text"
          placeholder="Search your policies..."
          className="mt-4 md:mt-0 border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">My Policies</h3>
          <p className="text-3xl font-bold">{myPolicies.length}</p>
          <p className="text-sm text-blue-500">Applied Policies</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Payments</h3>
          <p className="text-3xl font-bold">{payments.length}</p>
          <p className="text-sm text-green-500">
            Pending: {pendingPayments}, Success: {successPayments}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm">Total Spending</h3>
          <p className="text-3xl font-bold">৳{totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-yellow-500">This Month</p>
        </div>
      </div>

      {/* Chart & Recent Policies */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Payments Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Payments Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="payments" fill="#10b981" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Policies */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Policies</h2>
          <ul className="divide-y divide-gray-200">
            {myPolicies.slice(0, 5).map(policy => (
              <li key={policy._id} className="py-3 flex justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-700">{policy.policyName}</p>
                  <p className="text-gray-500">{policy.startDate}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    policy.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : policy.status === "Expired"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {policy.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
