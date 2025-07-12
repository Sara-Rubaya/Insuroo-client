import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://insuroo-server.vercel.app/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      await axios.patch(`https://insuroo-server.vercel.app/api/users/${userId}/role`, {
        role: newRole
      });
      Swal.fire('Success', `User role updated to ${newRole}`, 'success');
      fetchUsers();
    } catch (err) {
      Swal.fire('Error', 'Could not update role', err);
    }
  };

  const deleteUser = async (userId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action is irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`https://insuroo-server.vercel.app/api/users/${userId}`);
      Swal.fire('Deleted', 'User has been deleted', 'success');
      fetchUsers();
    } catch (err) {
      Swal.fire('Error', 'Could not delete user', err);
    }
  };

  const filteredUsers =
    filterRole === 'all'
      ? users
      : users.filter((u) => u.role === filterRole);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">Manage Users</h2>

      {/* Role filter */}
      <div className="mb-4">
        <label className="mr-2">Filter by role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="customer">Customer</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Registered</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border capitalize">{user.role}</td>
                <td className="px-4 py-2 border">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border space-y-2">
                  {user.role === 'customer' && (
                    <button
                      onClick={() => updateRole(user._id, 'agent')}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 w-full"
                    >
                      Promote to Agent
                    </button>
                  )}
                  {user.role === 'agent' && (
                    <button
                      onClick={() => updateRole(user._id, 'customer')}
                      className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 w-full"
                    >
                      Demote to Customer
                    </button>
                  )}
                  {/* Optional delete */}
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 w-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
