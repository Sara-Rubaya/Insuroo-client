import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const PaymentStatus = () => {
  const { transactionId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axiosSecure.get(`/api/payments/${transactionId}`);

        setPayment(res.data);
      } catch (err) {
        console.error('Error fetching payment status:', err);
        setError('Could not fetch payment status.');
      }
    };

    fetchPayment();
  }, [transactionId, axiosSecure]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!payment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
      <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
      <p><strong>Email:</strong> {payment.email}</p>
      <p><strong>Amount Paid:</strong> ৳{payment.amount}</p>
      <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
    </div>
  );
};

export default PaymentStatus;
