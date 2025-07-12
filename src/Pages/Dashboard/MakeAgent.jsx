import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageApplications = () => {

  const [allApplications, setAllApplications] = useState([]); // original list for search
  const [agents, setAgents] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApplications();
    fetchAgents();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('https://insuroo-server.vercel.app/api/applications');
      setAllApplications(res.data); // keep full list
    } catch (err) {
      console.error('Error fetching applications', err);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get('https://insuroo-server.vercel.app/api/agents'); // update if needed
      setAgents(res.data);
    } catch (err) {
      console.error('Error fetching agents', err);
    }
  };

  const handleAssignAgent = async (appId, agentId) => {
    try {
      await axios.patch(`https://insuroo-server.vercel.app/api/applications/${appId}/assign`, { agentId });
      Swal.fire('Success', 'Agent assigned successfully!', 'success');
      fetchApplications();
    } catch {
      Swal.fire('Error', 'Failed to assign agent', 'error');
    }
  };

  const handleReject = async (appId) => {
    try {
      await axios.patch(`https://insuroo-server.vercel.app/api/applications/${appId}/status`, { status: 'Rejected' });
      Swal.fire('Rejected', 'Application has been rejected.', 'info');
      fetchApplications();
    } catch {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApp(application);
    setViewModalOpen(true);
  };

  const getAgentName = (agentId) => {
    return agents.find((a) => a._id === agentId)?.name || 'Not Assigned';
  };

  const filteredApplications = allApplications.filter((app) =>
    app.personalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">Manage Applications</h2>

      {/* Search bar */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border px-4 py-2 rounded w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Policy</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Assigned Agent</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{app.personalName}</td>
                <td className="px-4 py-2 border">{app.email}</td>
                <td className="px-4 py-2 border">{app.policyName || 'N/A'}</td>
                <td className="px-4 py-2 border capitalize">{app.status}</td>
                <td className="px-4 py-2 border">{getAgentName(app.assignedAgent)}</td>
                <td className="px-4 py-2 border">{new Date(app.submittedAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border space-y-2">
                  <select
                    className="border rounded px-2 py-1 mb-2 w-full"
                    defaultValue=""
                    onChange={(e) => handleAssignAgent(app._id, e.target.value)}
                  >
                    <option value="">Assign Agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleReject(app._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 w-full"
                  >
                    ❌ Reject
                  </button>
                  <button
                    onClick={() => handleViewDetails(app)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 w-full"
                  >
                    📄 View Details
                  </button>
                </td>
              </tr>
            ))}
            {!filteredApplications.length && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {viewModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white max-w-md w-full rounded-lg p-6 relative">
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h3 className="text-2xl font-semibold mb-4">Application Details</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {selectedApp.personalName}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Policy:</strong> {selectedApp.policyName}</p>
              <p><strong>NID:</strong> {selectedApp.nid}</p>
              <p><strong>Nominee:</strong> {selectedApp.nomineeName}</p>
              <p><strong>Nominee Relation:</strong> {selectedApp.nomineeRelationship}</p>
              <p><strong>Health Disclosures:</strong> {selectedApp.healthDisclosure?.join(', ') || 'None'}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p><strong>Submitted:</strong> {new Date(selectedApp.submittedAt).toLocaleString()}</p>
              <p><strong>Assigned Agent:</strong> {getAgentName(selectedApp.assignedAgent)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
