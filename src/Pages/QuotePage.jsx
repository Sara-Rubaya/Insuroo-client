import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';


const QuotePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: '',
    gender: '',
    coverageAmount: '',
    duration: '',
    isSmoker: 'No',
  });

  const [quote, setQuote] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculatePremium = (e) => {
    e.preventDefault();
    const { age, coverageAmount, duration, isSmoker } = form;
    const ageNum = parseInt(age);
    const amount = parseFloat(coverageAmount);
    const years = parseInt(duration);

    if (!ageNum || !amount || !years) return;

    // Simple premium calculation logic (customize as needed)
    let baseRate = 0.03; // 3% of coverage per year
    if (ageNum > 40) baseRate += 0.01;
    if (isSmoker === 'Yes') baseRate += 0.015;

    const annual = (amount * baseRate).toFixed(2);
    const monthly = (annual / 12).toFixed(2);

    setQuote({ annual, monthly });
  };

  return (
    <div>
        <div className="max-w-4xl mx-auto my-24  text-gray-800  p-6 rounded-lg shadow-lg mt-10">
     <h2 className="text-2xl mb-18">Hello, {user.displayName || user.email}! <br /><span className='text-5xl font-bold mb-14 text-pink-600 text-center'>Get Your Insurance Quote</span></h2>


      <form onSubmit={calculatePremium} className="space-y-4">
        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Your Age"
          type="number"
          className="input input-bordered w-full"
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="coverageAmount"
          value={form.coverageAmount}
          onChange={handleChange}
          placeholder="Coverage Amount (e.g., 2000000)"
          type="number"
          className="input input-bordered w-full"
          required
        />

        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Policy Duration in Years (e.g., 20)"
          type="number"
          className="input input-bordered w-full"
          required
        />

        <select
          name="isSmoker"
          value={form.isSmoker}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="No">Non-Smoker</option>
          <option value="Yes">Smoker</option>
        </select>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded hover:opacity-90 w-full"
        >
          Estimate Premium
        </button>
      </form>

      {quote && (
        <div className="mt-6 bg-purple-50 dark:bg-purple-200 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-purple-700">Estimated Premium:</h3>
          <p>📆 Monthly: <strong>৳{quote.monthly}</strong></p>
          <p>📅 Annually: <strong>৳{quote.annual}</strong></p>

          <button
            onClick={() => navigate('/apply')}
            className="mt-4 bg-pink-500 hover:bg-pink-800 text-white px-6 py-2 rounded"
          >
            Apply for Policy
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default QuotePage;
