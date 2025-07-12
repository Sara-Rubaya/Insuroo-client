import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';

const MyApplications = () => {
  const { user } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state for review
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // Review form state
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState(null);

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

  // Show details with SweetAlert2 modal
  const showDetails = (app) => {
    Swal.fire({
      title: 'Policy Details',
      html: `
        <p><strong>Coverage Amount:</strong> ${app.coverageAmount || 'N/A'}</p>
        <p><strong>Duration:</strong> ${app.duration || 'N/A'} years</p>
        <p><strong>Premium:</strong> $${app.premium || 'N/A'}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Close',
    });
  };

  // Open review modal
  const openReviewModal = (app) => {
    setSelectedApp(app);
    setRating(0);
    setFeedback('');
    setReviewError(null);
    setModalOpen(true);
  };

  // Submit review handler
  const submitReview = async () => {
    if (rating < 1) {
      setReviewError('Please provide a star rating (1-5)');
      return;
    }
    setReviewSubmitting(true);
    setReviewError(null);

    try {
      await axios.post('https://insuroo-server.vercel.app/api/reviews', {
        applicationId: selectedApp._id,
        userEmail: user.email,
        rating,
        feedback,
        personalName: selectedApp.personalName || '',
      });
      setModalOpen(false);
      Swal.fire('Success!', 'Review submitted successfully!', 'success');
    } catch (error) {
      setReviewError('Failed to submit review. Please try again.',error);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) return <div>Loading your applications...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!applications.length) return <div>No applications found.</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-semibold mb-6">My Policies</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Application ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Submitted At</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{app._id}</td>
                <td className="border border-gray-300 px-4 py-2">{app.personalName || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{app.status || 'Pending'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {app.submittedAt ? new Date(app.submittedAt).toLocaleString() : 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => showDetails(app)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => openReviewModal(app)}
                  >
                    Give Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md bg-white text-gray-800 dark:bg-gray-50 dark:text-gray-800">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setModalOpen(false)}
              aria-label="Close review modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="w-6 h-6"
              >
                <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
              </svg>
            </button>

            {/* Big star icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-40 h-40 fill-current text-yellow-400 shrink-0"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.605 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
            </svg>

            <h2 className="text-2xl font-semibold leading-tight tracking-wide">
              ⭐ Submit Review
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Write a review for the purchased policy or your agent.
            </p>

            {/* Star rating */}
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} filled={star <= rating} onClick={() => setRating(star)} />
              ))}
            </div>

            {/* Feedback textarea */}
            <textarea
              className="w-full border border-gray-300 rounded p-2 resize-none mb-4"
              rows="4"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            {reviewError && <p className="text-red-600 mb-2">{reviewError}</p>}

            {/* Submit button */}
            <button
              type="button"
              onClick={submitReview}
              disabled={reviewSubmitting}
              className="px-8 py-3 font-semibold rounded-full bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50"
            >
              {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Star component for rating stars
const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    className={`w-10 h-10 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.605 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
  </svg>
);

export default MyApplications;
