import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserShield, FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const FeaturedAgents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axios.get('https://insuroo-server.vercel.app/api/agents/featured')
      .then(res => setAgents(res.data))
      .catch(err => console.error('Error fetching agents:', err));
  }, []);

  return (
    <section data-aos="fade-right" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Meet Our <span className="text-pink-600">Agents</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Trusted and approved agents ready to assist you with your insurance needs.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {agents.map((agent) => (
            <div key={agent._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-left">
              <div className="mb-4">
                <FaUserShield className="text-pink-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{agent.fullName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{agent.email}</p>

              <p className="text-gray-600 dark:text-gray-300 flex items-center mt-2">
                <FaPhoneAlt className="mr-2 text-green-500" /> {agent.phone}
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" /> {agent.city}
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center">
                <FaClock className="mr-2 text-purple-500" /> {agent.experience} years experience
              </p>

              {agent.message && (
                <p className="text-sm mt-3 italic text-gray-500 dark:text-gray-400">“{agent.message}”</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgents;
