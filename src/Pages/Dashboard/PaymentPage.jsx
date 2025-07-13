import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2';

// Load Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// === CheckoutForm Component ===
const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (price > 0) {
      axios
        .post(`${BACKEND_URL}/create-payment-intent`, { price })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(err => console.error('Failed to get client secret:', err));
    }
  }, [price, BACKEND_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      Swal.fire('Error', error.message, 'error');
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      Swal.fire('Error', confirmError.message, 'error');
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      Swal.fire('Success', 'Payment successful!', 'success');
      // TODO: Store payment info in DB if needed
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Make Payment</h2>
      <CardElement className="border p-3 rounded mb-6" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className={`w-full py-2 rounded text-white font-semibold ${
          processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
        }`}
      >
        {processing ? 'Processing...' : `Pay $${price.toFixed(2)}`}
      </button>
    </form>
  );
};

// === PaymentPage Component ===
const PaymentPage = () => {
  const { id } = useParams(); // policy ID
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (id) {
      axios
        .get(`${BACKEND_URL}/api/policies/${id}`)
        .then(res => {
          setPolicy(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching policy:', err);
          setLoading(false);
        });
    }
  }, [id, BACKEND_URL]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading policy...</div>;
  }

  if (!policy) {
    return <div className="text-center mt-10 text-red-600">Policy not found</div>;
  }

  const price = parseFloat(policy?.price) || 0;

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <CheckoutForm price={price} />
      </div>
    </Elements>
  );
};

export default PaymentPage;
