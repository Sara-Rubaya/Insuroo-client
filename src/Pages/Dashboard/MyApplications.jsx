import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';


const MyApplications = () => {
  const { user } = useContext(AuthContext); // Assuming user.email exists
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  if (!user?.email) return;

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://insuroo-server.vercel.app/api/applications?email=${encodeURIComponent(user.email)}`
      );
      setApplications(response.data);
    } catch (err) {
      setError('Failed to load applications',err);
    } finally {
      setLoading(false);
    }
  };

  fetchApplications();
}, [user?.email]);


  if (loading) return <div>Loading your applications...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!applications.length) return <div>No applications found.</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-5xl font-semibold mb-4">My Insurance Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Application ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">NID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nominee Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nominee Relationship</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Health Disclosures</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{app._id}</td>
                <td className="border border-gray-300 px-4 py-2">{app.personalName || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{app.email || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{app.nid || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{app.nomineeName || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{app.nomineeRelationship || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {app.healthDisclosure && app.healthDisclosure.length > 0
                    ? app.healthDisclosure.join(', ')
                    : 'None'}
                </td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {app.status || 'Pending'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {app.submittedAt ? new Date(app.submittedAt).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
