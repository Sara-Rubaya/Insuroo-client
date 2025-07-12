import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserCheck, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/ LoadingSpinner";


const MakeAgent = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: agents = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedAgents", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/agents/search?email=${emailQuery}`);
      return res.data;
    },
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) =>
      await axiosSecure.patch(`/api/agents/${id}/status`, { status }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleStatusChange = async (id, currentStatus) => {
    const action = currentStatus === "approved" ? "Revoke Agent" : "Approve Agent";
    const newStatus = currentStatus === "approved" ? "pending" : "approved";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateStatus({ id, status: newStatus });
      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update agent status", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Make Agent</h2>

      <div className="flex gap-2 mb-6 items-center">
        <FaSearch />
        <input
          type="text"
          className="input input-bordered w-full max-w-md"
          placeholder="Search agent by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
      </div>

      {isFetching && LoadingSpinner}

      {!isFetching && agents.length === 0 && emailQuery && (
        <p className="text-gray-500">No agents found.</p>
      )}

      {agents.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.email}</td>
                  <td>{agent.fullName}</td>
                  <td>
                    <span
                      className={`badge ${agent.status === "approved" ? "badge-success" : "badge-ghost"
                        }`}
                    >
                      {agent.status || "pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleStatusChange(agent._id, agent.status || "pending")
                      }
                      className={`btn btn-sm text-black ${agent.status === "approved"
                        ? "btn-error"
                        : "btn-primary"
                        }`}
                    >
                      {agent.status === "approved" ? (
                        <>
                          <FaUserTimes className="mr-1" />
                          Revoke Agent
                        </>
                      ) : (
                        <>
                          <FaUserCheck className="mr-1" />
                          Approve Agent
                        </>
                      )}
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

export default MakeAgent;
