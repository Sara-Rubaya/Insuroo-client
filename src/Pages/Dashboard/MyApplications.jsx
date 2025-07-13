import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';


const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`${BACKEND_URL}/api/policyApplications?userEmail=${user.email}`)
        .then(res => {
          setApplications(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch applications:', err);
          setLoading(false);
        });
    }
  }, [user, BACKEND_URL]);

  if (loading) return <div className="text-center mt-10 text-xl">Loading your applications...</div>;

  if (!applications.length)
    return <div className="text-center mt-10 text-gray-500">You have not applied for any policies yet.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Policy Applications</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Policy ID</th>
              <th className="py-3 px-4 text-left">Personal Name</th>
              <th className="py-3 px-4 text-left">Nominee</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{app.policyId}</td>
                <td className="py-3 px-4">{app.personalName}</td>
                <td className="py-3 px-4">{app.nomineeName} ({app.nomineeRelationship})</td>
                <td className={`py-3 px-4 font-semibold ${
                  app.status === 'Pending' ? 'text-yellow-600' :
                  app.status === 'Approved' ? 'text-green-600' :
                  app.status === 'Rejected' ? 'text-red-600' : ''
                }`}>
                  {app.status}
                </td>
                <td className="py-3 px-4">{new Date(app.submittedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
