import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';
import { useParams } from 'react-router';

const ApplyPolicy = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    personalName: '',
    address: '',
    nid: '',
    nomineeName: '',
    nomineeRelationship: '',
    healthDisclosure: '',
  });

  const BACKEND_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  if (!id || !BACKEND_URL) {
    setLoading(false);
    return;
  }

  axios
    .get(`${BACKEND_URL}/api/policies/${id}`)
    .then(res => {
      console.log("Policy API response:", res.data);  // এটা যোগ করো
      setPolicy(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      Swal.fire('Error', 'Failed to load policy details', 'error');
      setLoading(false);
    });
}, [id, BACKEND_URL]);




  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const application = {
      ...formData,
      userEmail: user?.email,
      policyId: id,
      userId: user?.uid,
      healthDisclosure: formData.healthDisclosure
        ? formData.healthDisclosure.split(',').map(item => item.trim())
        : [],
      status: 'Pending',
      submittedAt: new Date(),
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/policyApplications`, application);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Policy Application Submitted', 'success');
        setFormData({
          personalName: '',
          address: '',
          nid: '',
          nomineeName: '',
          nomineeRelationship: '',
          healthDisclosure: '',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Submission failed', 'error');
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  if (!policy) return <div className="text-center mt-10 text-red-600">No policy found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Policy Info */}
      <div>
        <img
          src={policy.image}
          alt={policy.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{policy.title}</h2>
        <p><span className="font-semibold">Coverage:</span> {policy.coverage || 'N/A'}</p>
        <p><span className="font-semibold">Eligibility:</span> {policy.eligibility || 'N/A'}</p>
        <p><span className="font-semibold">Benefits:</span> {policy.benefits || 'N/A'}</p>
        <p><span className="font-semibold">Term:</span> {policy.termLength || 'N/A'}</p>
        <p><span className="font-semibold">Category:</span> {policy.category || 'N/A'}</p>
        <p><span className="font-semibold">Published:</span> {new Date(policy.publishedDate).toLocaleDateString()}</p>
      </div>

      {/* Right: Application Form */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Apply for this Policy</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="personalName"
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={formData.personalName}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="w-full border p-2 rounded"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            name="nid"
            type="text"
            placeholder="NID Number"
            className="w-full border p-2 rounded"
            value={formData.nid}
            onChange={handleChange}
            required
          />
          <input
            name="nomineeName"
            type="text"
            placeholder="Nominee Name"
            className="w-full border p-2 rounded"
            value={formData.nomineeName}
            onChange={handleChange}
            required
          />
          <input
            name="nomineeRelationship"
            type="text"
            placeholder="Nominee Relationship"
            className="w-full border p-2 rounded"
            value={formData.nomineeRelationship}
            onChange={handleChange}
            required
          />
          <textarea
            name="healthDisclosure"
            placeholder="Health Disclosure (comma-separated)"
            className="w-full border p-2 rounded"
            value={formData.healthDisclosure}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="mx-auto block bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPolicy;
