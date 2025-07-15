import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/payments');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions</p>;

  // Prepare data for the earnings chart
  // Group payments by date (YYYY-MM-DD) and sum amounts
  const earningsByDate = payments.reduce((acc, payment) => {
    if (payment.status !== 'Success') return acc; // only count successful payments

    const date = payment.createdAt
      ? new Date(payment.createdAt).toISOString().slice(0, 10)
      : 'Unknown';

    acc[date] = (acc[date] || 0) + payment.amount;
    return acc;
  }, {});

  // Convert to array for recharts [{ date: '2025-07-15', amount: 5000 }, ...]
  const chartData = Object.entries(earningsByDate)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Transactions</h1>

      

      {/* Earnings chart */}
      <div className="mb-8 p-4 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Total Earnings Over Time</h2>
        {chartData.length === 0 ? (
          <p className="text-gray-500">No earnings data to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 10, right: 30, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `৳${value}`} />
              <Line type="monotone" dataKey="amount" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Transactions table */}
      <div className="overflow-x-auto border rounded-lg border-gray-300">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              {[
                'Transaction ID',
                'Customer Email',
                'Policy Name',
                'Amount (BDT)',
                'Date',
                'Status',
              ].map((heading) => (
                <th
                  key={heading}
                  className="text-left px-4 py-3 font-semibold text-gray-700"
                  style={{ minWidth: '140px' }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">{payment.transactionId}</td>
                  <td className="px-4 py-3">{payment.email}</td>
                  <td className="px-4 py-3">{payment.policyTitle || '—'}</td>
                  <td className="px-4 py-3">{payment.amount}</td>
                  <td className="px-4 py-3">
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        payment.status === 'Success'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'Failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {payment.status || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactions;
