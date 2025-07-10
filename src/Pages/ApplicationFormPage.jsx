import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';

const healthOptions = [
  'Diabetes',
  'High Blood Pressure',
  'Heart Disease',
  'Cancer',
  'Asthma',
  'None',
];

const ApplicationFormPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [application, setApplication] = useState({
    personalName: '',
    email: user?.email || '',
    address: '',
    nid: '',
    nomineeName: '',
    nomineeRelationship: '',
    healthDisclosure: [],
  });

  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'healthDisclosure') {
      let updatedHealth = [...application.healthDisclosure];
      if (checked) {
        updatedHealth.push(value);
      } else {
        updatedHealth = updatedHealth.filter((item) => item !== value);
      }
      setApplication({ ...application, healthDisclosure: updatedHealth });
    } else {
      setApplication({ ...application, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to submit an application');
      return;
    }

    if (
      !application.personalName ||
      !application.address ||
      !application.nid ||
      !application.nomineeName ||
      !application.nomineeRelationship
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    // Confirmation alert before submitting
    const result = await Swal.fire({
      title: 'Confirm Submission',
      text: 'Are you sure you want to submit your application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      // User cancelled submission
      return;
    }

    try {
      const newApplication = {
        ...application,
        userId: user.uid,
        status: 'Pending',
        submittedAt: new Date(),
      };

      const res = await axios.post(`${BACKEND_URL}/api/applications`, newApplication);

      if (res.data?.message === 'Application submitted successfully') {
        await Swal.fire({
          icon: 'success',
          title: 'Application submitted!',
          showConfirmButton: false,
          timer: 1500,
        });
        setApplication({
          personalName: '',
          email: user.email,
          address: '',
          nid: '',
          nomineeName: '',
          nomineeRelationship: '',
          healthDisclosure: [],
        });
        navigate('/dashboard'); // Redirect after submission
      }
    } catch (error) {
      toast.error('Failed to submit application');
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Insurance Application Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Info */}
        <input
          type="text"
          name="personalName"
          value={application.personalName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          value={application.email}
          readOnly
          disabled
          className="w-full border p-2 rounded bg-gray-200"
          placeholder="Email"
        />

        <textarea
          name="address"
          value={application.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="nid"
          value={application.nid}
          onChange={handleChange}
          placeholder="NID/SSN"
          required
          className="w-full border p-2 rounded"
        />

        {/* Nominee */}
        <input
          type="text"
          name="nomineeName"
          value={application.nomineeName}
          onChange={handleChange}
          placeholder="Nominee Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="nomineeRelationship"
          value={application.nomineeRelationship}
          onChange={handleChange}
          placeholder="Nominee Relationship"
          required
          className="w-full border p-2 rounded"
        />

        {/* Health Disclosure */}
        <div className="mt-4">
          <p className="font-semibold mb-2">Health Disclosure</p>
          <div className="flex flex-wrap gap-4">
            {healthOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="healthDisclosure"
                  value={option}
                  checked={application.healthDisclosure.includes(option)}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700 mt-6"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationFormPage;
