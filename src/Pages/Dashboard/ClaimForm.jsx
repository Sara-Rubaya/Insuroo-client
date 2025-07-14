import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClaimForm = ({ application }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  if (!application) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const claimData = {
      policyId: application.policyId,
      applicationId: application._id,
      policyTitle: application.policyTitle,
      userEmail: application.email || application.userEmail,
      reason,
      claimStatus: 'Pending',
      submittedAt: new Date(),
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/claims`, claimData);
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Your claim has been submitted.', 'success');
        setReason('');
      } else {
        throw new Error('Failed to submit claim');
      }
    } catch (err) {
      console.error('Claim submission failed:', err);
      Swal.fire('Error', 'Failed to submit claim. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-6 rounded shadow mt-6">
      <div>
        <label className="font-semibold">Policy Title</label>
        <input
          type="text"
          value={application.policyTitle}
          disabled
          className="w-full p-2 border rounded bg-gray-200"
        />
      </div>

      <div>
        <label className="font-semibold">Reason for Claim</label>
        <textarea
          required
          className="w-full p-2 border rounded"
          placeholder="Write your claim reason here..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Submitting...' : 'Submit Claim'}
      </button>
    </form>
  );
};

export default ClaimForm;
