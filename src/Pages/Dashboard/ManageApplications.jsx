import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all applications
  const { data: applications = [], refetch } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/applications');
      return res.data;
    },
  });

  // Handle reject
  const handleReject = async (id) => {
    const { value: feedback } = await Swal.fire({
      title: 'Reject Application',
      input: 'textarea',
      inputLabel: 'Write a rejection reason',
      inputPlaceholder: 'Your feedback...',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Reject',
    });

    if (feedback) {
      try {
        await axiosSecure.patch(`/api/applications/${id}`, {
          status: 'Rejected',
          feedback,
        });
        Swal.fire('Rejected!', 'Application rejected successfully.', 'success');
        refetch();
      } catch (err) {
        Swal.fire('Error!', 'Something went wrong.', err);
      }
    }
  };

  // Handle assign agent
  const handleAssignAgent = async (id, agentEmail) => {
    try {
      await axiosSecure.patch(`/api/applications/${id}`, {
        status: 'Approved',
        assignedAgent: agentEmail,
      });
      Swal.fire('Assigned!', 'Agent assigned successfully.', 'success');
      refetch();
    } catch (err) {
      Swal.fire('Error', 'Failed to assign agent', err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
            <th className="px-6 py-3">Applicant</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Policy</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">{app.personalName}</td>
              <td className="px-6 py-3">{app.email}</td>
              <td className="px-6 py-3">{app.policyName || '—'}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${
                    app.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : app.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-3 flex flex-wrap gap-2">
                {/* Assign Agent */}
                <select
                  defaultValue=""
                  onChange={(e) => handleAssignAgent(app._id, e.target.value)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  <option value="" disabled>
                    Assign Agent
                  </option>
                  <option value="agent1@email.com">Agent 1</option>
                  <option value="agent2@email.com">Agent 2</option>
                </select>

                {/* Reject Button */}
                <button
                  onClick={() => handleReject(app._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>

                {/* View Details */}
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setModalOpen(true);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {modalOpen && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-lg relative">
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <p><strong>Name:</strong> {selectedApplication.personalName}</p>
            <p><strong>Email:</strong> {selectedApplication.email}</p>
            <p><strong>Address:</strong> {selectedApplication.address}</p>
            <p><strong>NID:</strong> {selectedApplication.nid}</p>
            <p><strong>Nominee:</strong> {selectedApplication.nomineeName} ({selectedApplication.nomineeRelationship})</p>
            <p><strong>Status:</strong> {selectedApplication.status}</p>
            <p><strong>Disclosure:</strong> {selectedApplication.healthDisclosure?.join(', ')}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-red-600 text-xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
