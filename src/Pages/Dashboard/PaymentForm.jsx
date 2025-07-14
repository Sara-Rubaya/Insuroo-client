import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();  
  const policyId = id;  
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { isPending, data: policyInfo = {} } = useQuery({
    queryKey: ['policy', policyId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/policies/${policyId}`);
      return res.data;
    }
  });

  if (isPending) return '...loading';

  const amount = Number(policyInfo.basePremiumRate) || 0;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setError(error.message);
    } else {
      setError('');

      const res = await axiosSecure.post('/create-payment-intent', {
        amountInCents,
        policyId
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const transactionId = result.paymentIntent.id;
          console.log("✅ Payment Succeeded! Transaction ID:", transactionId);

          const paymentData = {
            policyId,
            email: user.email,
            amount,
            transactionId,
            paymentMethod: result.paymentIntent.payment_method_types
          };

          const paymentRes = await axiosSecure.post('/payments', paymentData);
          if (paymentRes.data.insertedId) {
            await Swal.fire({
              icon: 'success',
              title: 'Payment Successful!',
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: 'Go to Payment Status.'
            });

            navigate(`/dashboard/paymentStatus/${transactionId}`);
          }
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          className="focus:outline-none text-white bg-gradient-to-r from-purple-400 to-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          disabled={!stripe}
        >
          Pay ৳{amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
