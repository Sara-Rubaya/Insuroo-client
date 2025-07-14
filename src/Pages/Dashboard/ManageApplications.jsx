import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch policy applications
  const { data: applications = [], refetch: refetchApplications } = useQuery({
    queryKey: ['policyApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/policyApplications', {
        params: { userEmail: '' }, // যেহেতু আপনার backend এ userEmail query param দরকার, যদি না দরকার হয় তাহলে empty string দিন
      });
      return res.data;
    },
  });

  // Fetch approved agents
  const { data: agents = [], isLoading: agentsLoading } = useQuery({
    queryKey: ['agents', 'approved'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/agents', {
        params: { status: 'approved' },
      });
      return res.data;
    },
  });

  // Assign agent handler
  const handleAssignAgent = async (applicationId, agentEmail) => {
    try {
      await axiosSecure.patch(`/api/policyApplications/${applicationId}`, {
        status: 'Approved',
        assignedAgent: agentEmail,
      });
      Swal.fire('Success', 'Agent assigned successfully', 'success');
      refetchApplications();
    } catch (error) {
      Swal.fire('Error', 'Failed to assign agent', error);
    }
  };

  // Reject handler
  const handleReject = async (id) => {
    const { value: feedback } = await Swal.fire({
      title: 'Reject Application',
      input: 'textarea',
      inputLabel: 'Write rejection reason',
      inputPlaceholder: 'Your feedback...',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Reject',
    });

    if (feedback) {
      try {
        await axiosSecure.patch(`/api/policyApplications/${id}`, {
          status: 'Rejected',
          rejectionFeedback: feedback,
        });
        Swal.fire('Rejected!', 'Application rejected successfully.', 'success');
        refetchApplications();
      } catch (err) {
        Swal.fire('Error!', 'Something went wrong.', err);
      }
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
            <th className="px-6 py-3">Applicant</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Policy</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No applications found.
              </td>
            </tr>
          )}

          {applications.map((app) => (
            <tr
              key={app._id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-3">{app.personalName}</td>
              <td className="px-6 py-3">{app.userEmail}</td>
              <td className="px-6 py-3">{app.policyTitle || '—'}</td>
              <td className="px-6 py-3">
                {new Date(app.submittedAt).toLocaleDateString()}
              </td>
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

              <td className="px-6 py-3 flex flex-wrap gap-2 items-center">
                {/* Assign Agent Dropdown */}
                <select
                  defaultValue=""
                  onChange={(e) => handleAssignAgent(app._id, e.target.value)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  <option value="" disabled>
                    Assign Agent
                  </option>
                  {agentsLoading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    agents.map((agent) => (
                      <option key={agent._id} value={agent.email}>
                        {agent.displayName || agent.email}
                      </option>
                    ))
                  )}
                </select>

                {/* Reject Button */}
                <button
                  onClick={() => handleReject(app._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>

                {/* View Details Button */}
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setModalOpen(true);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <p>
              <strong>Name:</strong> {selectedApplication.personalName}
            </p>
            <p>
              <strong>Email:</strong> {selectedApplication.userEmail}
            </p>
            <p>
              <strong>Address:</strong> {selectedApplication.address}
            </p>
            <p>
              <strong>NID:</strong> {selectedApplication.nid}
            </p>
            <p>
              <strong>Nominee:</strong>{' '}
              {selectedApplication.nomineeName} (
              {selectedApplication.nomineeRelationship})
            </p>
            <p>
              <strong>Status:</strong> {selectedApplication.status}
            </p>
            <p>
              <strong>Disclosure:</strong>{' '}
              {selectedApplication.healthDisclosure?.join(', ') || 'N/A'}
            </p>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-red-600 text-xl font-bold"
              aria-label="Close Modal"
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
