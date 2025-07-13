import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManagePolicyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectFeedback, setRejectFeedback] = useState('');
  const [rejectingId, setRejectingId] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/policyApplications`)
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch applications:', err);
        setLoading(false);
      });
  };

  const handleApprove = (id) => {
    axios.patch(`${BACKEND_URL}/api/policyApplications/${id}`, { status: 'Approved' })
      .then(() => {
        Swal.fire('Approved!', 'Application has been approved.', 'success');
        fetchApplications();
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to approve application.', 'error');
      });
  };

  const openRejectModal = (id) => {
    setRejectingId(id);
    setRejectFeedback('');
  };

  const handleReject = () => {
    if (!rejectFeedback.trim()) {
      Swal.fire('Warning', 'Please provide rejection feedback.', 'warning');
      return;
    }
    axios.patch(`${BACKEND_URL}/api/policyApplications/${rejectingId}`, { status: 'Rejected', rejectionFeedback: rejectFeedback })
      .then(() => {
        Swal.fire('Rejected!', 'Application has been rejected.', 'success');
        setRejectingId(null);
        setRejectFeedback('');
        fetchApplications();
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to reject application.', 'error');
      });
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading applications...</div>;

  if (applications.length === 0) return <div className="text-center mt-10 text-gray-500">No applications found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Policy Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Applicant Name</th>
              <th className="py-3 px-4 text-left">Policy ID</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Submitted At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{app.personalName}</td>
                <td className="py-3 px-4">{app.policyId}</td>
                <td className={`py-3 px-4 font-semibold ${
                  app.status === 'Pending' ? 'text-yellow-600' :
                  app.status === 'Approved' ? 'text-green-600' :
                  app.status === 'Rejected' ? 'text-red-600' : ''
                }`}>
                  {app.status}
                </td>
                <td className="py-3 px-4">{new Date(app.submittedAt).toLocaleDateString()}</td>
                <td className="py-3 px-4 space-x-2">
                  {app.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(app._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openRejectModal(app._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {app.status === 'Rejected' && app.rejectionFeedback && (
                    <span className="text-sm text-red-700 italic" title="Rejection Feedback">{app.rejectionFeedback}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Reject Application</h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Provide rejection feedback"
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setRejectingId(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePolicyApplications;
