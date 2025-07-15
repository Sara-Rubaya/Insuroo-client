import React, { useEffect, useState } from 'react';
import axios from 'axios';

const statusOptions = ['Pending', 'Approved', 'Rejected'];

const AssignedCustomers = ({ agentEmail }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!agentEmail) return;

    const fetchApplications = async () => {
      try {
        const res = await axios.get(`/api/applications?agentEmail=${agentEmail}`);
        setApplications(res.data);
      } catch (error) {
        console.error('Error fetching assigned customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [agentEmail]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      // Update application status in DB
      await axios.patch(`/api/applications/${applicationId}`, { status: newStatus });

      // Update locally
      setApplications(prev =>
        prev.map(app => (app._id === applicationId ? { ...app, status: newStatus } : app))
      );

      // If approved, increment policy purchase count
      if (newStatus === 'Approved') {
        const application = applications.find(app => app._id === applicationId);
        if (application?.policyId) {
          await axios.patch(`/api/policies/${application.policyId}/incrementPurchase`);
          // Or if you have no such endpoint, you can create it on backend
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const openDetails = (application) => {
    setSelectedApplication(application);
    setModalOpen(true);
  };

  const closeDetails = () => {
    setSelectedApplication(null);
    setModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assigned Customers</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Customer Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Policies Interested</th>
            <th className="p-2 border border-gray-300">Application Status</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-300">{app.customerName || 'N/A'}</td>
              <td className="p-2 border border-gray-300">{app.userEmail}</td>
              <td className="p-2 border border-gray-300">{app.policyTitle || 'N/A'}</td>
              <td className="p-2 border border-gray-300">
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  className="border border-gray-400 rounded px-2 py-1"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="p-2 border border-gray-300">
                <button
                  onClick={() => openDetails(app)}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for details */}
      {modalOpen && selectedApplication && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4"
          onClick={closeDetails}
        >
          <div
            className="bg-white rounded p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Customer Details</h3>
            <p><strong>Name:</strong> {selectedApplication.customerName || 'N/A'}</p>
            <p><strong>Email:</strong> {selectedApplication.userEmail}</p>
            <p><strong>Policy Interested:</strong> {selectedApplication.policyTitle || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedApplication.status}</p>
            <p><strong>Additional Inquiry:</strong> {/* Add more fields if you have */}</p>

            <button
              onClick={closeDetails}
              className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedCustomers;
