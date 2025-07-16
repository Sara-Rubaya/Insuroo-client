import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';



const Payment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/api/payments/status?email=${user.email}`)
        .then((res) => {
          setPayments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching payment status:', err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) return <p className="text-center my-10">Loading payment status...</p>;

  if (payments.length === 0) {
    return <p className="text-center text-gray-500">No payment records found.</p>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Payment Status</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Policy Title</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Frequency</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{payment.policyTitle || 'N/A'}</td>
                <td className="px-4 py-2">৳{payment.amount}</td>
                <td className="px-4 py-2">Monthly</td>
                <td className="px-4 py-2 font-semibold">
                  {payment.status === 'Success' ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-500">Due</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {payment.status !== 'Success' ? (
                    <Link
                      to={`/dashboard/payment/${payment.policyId}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Pay Now
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-sm">Already Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
