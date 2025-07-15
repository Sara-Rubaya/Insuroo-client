import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const EarningsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/payments/earnings-over-time')
      .then(res => {
        // Convert _id to date label, totalEarnings stays as number
        const chartData = res.data.map(item => ({
          date: item._id,
          earnings: item.totalEarnings,
        }));
        setData(chartData);
      })
      .catch(err => console.error('Error loading earnings data:', err));
  }, []);

  return (
    <div className="w-full h-96 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Total Earnings Over Time</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsChart;
