import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Load all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users");
      return res.data;
    },
  });

  // Change role (promote/demote)
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(`/api/users/${id}/role`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", `User role changed to ${newRole}`, "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update user role", err);
    }
  };

  // Delete user (optional)
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/api/users/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete user", err);
      }
    }
  };

  const badgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-200 text-red-700";
      case "agent":
        return "bg-blue-200 text-blue-700";
      default:
        return "bg-green-200 text-green-700";
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">{user.displayName || "—"}</td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeColor(
                    user.role
                  )}`}
                >
                  {user.role || "customer"}
                </span>
              </td>
              <td className="px-6 py-3 flex flex-wrap gap-2">
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleRoleChange(user._id, "admin")}
                    className="bg-red-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Make Admin
                  </button>
                )}
                {user.role !== "agent" && (
                  <button
                    onClick={() => handleRoleChange(user._id, "agent")}
                    className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Make Agent
                  </button>
                )}
                {user.role !== "customer" && (
                  <button
                    onClick={() => handleRoleChange(user._id, "customer")}
                    className="bg-green-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Make Customer
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-gray-400 text-white text-sm px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
