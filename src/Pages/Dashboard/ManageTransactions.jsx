import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Transactions</h1>

      {/* Filter buttons (UI only) */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <button className="btn btn-outline btn-sm">Filter by Date Range</button>
        <button className="btn btn-outline btn-sm">Filter by User</button>
        <button className="btn btn-outline btn-sm">Filter by Policy</button>
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
