import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const statusColors = {
  Pending: 'bg-yellow-200 text-yellow-800',
  Approved: 'bg-green-200 text-green-800',
  Rejected: 'bg-red-200 text-red-800',
};

const AssignedCustomers = () => {
  const { user } = useAuth();
  const [assignedCustomers, setAssignedCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch assigned applications
  useEffect(() => {
    const fetchAssigned = async () => {
      try {
        const res = await axiosSecure.get(`/api/applications/assigned?email=${user?.email}`);
        setAssignedCustomers(res.data);
      } catch (error) {
        console.error('Failed to load assigned customers:', error);
      }
    };

    if (user?.email) {
      fetchAssigned();
      console.log("Current user:", user?.email);
    }
  }, [user, axiosSecure]);

  // Handle status update
  const handleStatusChange = async (applicationId, newStatus, policyId) => {
    try {
      const res = await axiosSecure.patch(`/status/${applicationId}`, {
        status: newStatus,
        policyId
      });

      if (res.data?.message) {
        Swal.fire('Success', 'Application status updated.', 'success');

        // Refresh list
        const updated = assignedCustomers.map(app =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        );
        setAssignedCustomers(updated);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

 // ...rest of your component

return (
  <div className="p-6 max-w-7xl mx-auto">
    {/* ...rest of the UI above */}

    {assignedCustomers.length === 0 ? (
      <p className="text-gray-400 italic text-lg">No assigned customers found for <span className="font-semibold">{user?.email}</span></p>
    ) : (
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <tr>
              <th className="p-3 text-left font-semibold tracking-wide">Customer Name</th>
              <th className="p-3 text-left font-semibold tracking-wide">Email</th>
              <th className="p-3 text-left font-semibold tracking-wide">Policy</th>
              <th className="p-3 text-left font-semibold tracking-wide">Status</th>
              <th className="p-3 text-left font-semibold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedCustomers.map((application, idx) => (
              <tr
                key={application._id}
                className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition-colors`}
              >
                <td className="p-3">{application.personalName}</td>
                <td className="p-3 text-indigo-700 font-medium">{application.userEmail}</td>
                <td className="p-3">{application.policyTitle || 'N/A'}</td>
                <td className="p-3">
                  <select
                    className={`select select-bordered w-full max-w-[140px] ${statusColors[application.status] || 'bg-gray-100 text-gray-800'}`}
                    value={application.status}
                    onChange={(e) =>
                      handleStatusChange(application._id, e.target.value, application.policyId)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedCustomer(application)}
                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {/* Modal */}
    {selectedCustomer && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setSelectedCustomer(null)} // close modal if clicking outside the box
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative"
          onClick={(e) => e.stopPropagation()} // prevent modal close on clicking inside box
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-700 border-b border-indigo-300 pb-2">
            Customer Profile
          </h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {selectedCustomer.personalName}</p>
            <p><strong>Email:</strong> {selectedCustomer.userEmail}</p>
            <p><strong>Address:</strong> {selectedCustomer.address}</p>
            <p><strong>NID:</strong> {selectedCustomer.nid}</p>
            <p><strong>Nominee:</strong> {selectedCustomer.nomineeName} ({selectedCustomer.nomineeRelationship})</p>
            <p><strong>Policy:</strong> {selectedCustomer.policyTitle}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`ml-2 px-2 py-1 rounded font-semibold ${
                  statusColors[selectedCustomer.status] || 'bg-gray-200 text-gray-700'
                }`}
              >
                {selectedCustomer.status}
              </span>
            </p>
            <p><strong>Submitted At:</strong> {new Date(selectedCustomer.submittedAt).toLocaleString()}</p>
          </div>

          <button
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => setSelectedCustomer(null)}
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
