import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth(); // user = firebase auth user
  const axiosSecure = useAxiosSecure();
  const [lastLogin, setLastLogin] = useState('');

  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      name: '',
      photo: '',
    }
  });

  // Fetch last login time from Firebase metadata
  useEffect(() => {
    if (user?.metadata?.lastSignInTime) {
      setLastLogin(new Date(user.metadata.lastSignInTime).toLocaleString());
    }

    reset({
      name: user?.displayName || '',
      photo: user?.photoURL || '',
    });
  }, [user, reset]);

  // Mutation to update user info in your DB
  const updateUserMutation = useMutation({
    mutationFn: (data) =>
      axiosSecure.put(`/api/users/${user?.email}`, data),
    onSuccess: () => {
      alert('Profile updated successfully');
    },
    onError: () => {
      alert('Something went wrong');
    }
  });

  const onSubmit = (data) => {
    updateUserMutation.mutate({
      name: data.name,
      photo: data.photo,
    });
  };

  // Role badge styling
  const getRoleBadge = (role) => {
    if (role === 'admin') return <span className="badge bg-red-500 text-white">Admin</span>;
    if (role === 'agent') return <span className="badge bg-blue-500 text-white">Agent</span>;
    return <span className="badge bg-green-500 text-white">Customer</span>;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-3xl my-16">
      <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-pink-700 bg-clip-text text-transparent">
  My Profile
</h2>

      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user?.photoURL || 'https://i.ibb.co/2nGq6Wv/user.png'}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{user?.displayName}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="mt-1 ">{getRoleBadge(user?.role)}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register('name')}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Photo URL</label>
          <input
            {...register('photo')}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter photo URL"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-500">Email (non-editable)</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="w-full border bg-gray-100 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-500">Last Login</label>
          <input
            type="text"
            value={lastLogin}
            disabled
            className="w-full border bg-gray-100 px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className=" text-white px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-purple-900 "
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
