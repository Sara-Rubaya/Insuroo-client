import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSearch, FaTrashAlt, FaUserShield, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["users", searchEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        searchEmail
          ? `/api/users/search?email=${searchEmail}`
          : `/api/users`
      );
      return res.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/api/users/${id}/role`, { role }),
    onSuccess: () => {
      Swal.fire("Success", "Role updated", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role", "error");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.delete(`/api/users/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted", "User removed", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete user", "error");
    },
  });

  const handleRoleChange = (user) => {
    const nextRole =
      user.role === "admin"
        ? "customer"
        : user.role === "agent"
        ? "admin"
        : "agent";

    Swal.fire({
      title: `Change role to "${nextRole}"?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ id: user._id, role: nextRole });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: `Delete ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(user._id);
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Manage Users</h2>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4 items-center">
        <FaSearch />
        <input
          type="text"
          className="input input-bordered w-full max-w-md"
          placeholder="Search user by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </div>

      {isFetching ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Registered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === "admin"
                          ? "badge-success"
                          : u.role === "agent"
                          ? "badge-info"
                          : "badge-ghost"
                      }`}
                    >
                      {u.role || "customer"}
                    </span>
                  </td>
                  <td>
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleRoleChange(u)}
                      className={`btn btn-xs ${
                        u.role === "admin"
                          ? "btn-error"
                          : "btn-primary"
                      }`}
                    >
                      {u.role === "admin" ? (
                        <>
                          <FaUser className="mr-1" /> Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield className="mr-1" /> Promote
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(u)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      <FaTrashAlt className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
