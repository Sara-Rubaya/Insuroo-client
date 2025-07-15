import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakeAgent = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTab, setSelectedTab] = useState("pending");
  const [rejectingAgent, setRejectingAgent] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Fetch pending agents
  const {
    data: pendingAgents = [],
    isLoading: loadingPending,
    refetch: refetchPending,
  } = useQuery({
    queryKey: ["pendingAgents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/agents?status=pending");
      return res.data;
    },
  });

  // Fetch approved agents
  const {
    data: approvedAgents = [],
    isLoading: loadingApproved,
    refetch: refetchApproved,
  } = useQuery({
    queryKey: ["approvedAgents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/agents?status=approved");
      return res.data;
    },
  });

  // Approve agent
  const approveAgentMutation = useMutation({
    mutationFn: async (agentId) => {
      return axiosSecure.patch(`/api/agents/${agentId}/approve`);
    },
    onSuccess: () => {
      Swal.fire("Success", "Agent approved successfully!", "success");
      refetchPending();
      refetchApproved();
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve agent.", "error");
    },
  });

  // Demote agent
  const demoteAgentMutation = useMutation({
    mutationFn: async (agentId) => {
      return axiosSecure.patch(`/api/agents/${agentId}/demote`);
    },
    onSuccess: () => {
      Swal.fire("Success", "Agent demoted to customer.", "success");
      refetchApproved();
    },
    onError: () => {
      Swal.fire("Error", "Failed to demote agent.", "error");
    },
  });

  // Reject agent
  const rejectAgentMutation = useMutation({
    mutationFn: async ({ agentId, reason }) => {
      return axiosSecure.patch(`/api/agents/${agentId}/reject`, { reason });
    },
    onSuccess: () => {
      Swal.fire("Success", "Agent application rejected.", "success");
      setRejectingAgent(null);
      setRejectReason("");
      refetchPending();
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject application.", "error");
    },
  });

  const handleApprove = (id) => {
    approveAgentMutation.mutate(id);
  };

  const handleDemote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Demoting agent will revoke their privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, demote",
    }).then((result) => {
      if (result.isConfirmed) {
        demoteAgentMutation.mutate(id);
      }
    });
  };

  const handleOpenRejectModal = (agent) => {
    setRejectingAgent(agent);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      Swal.fire("Error", "Please enter rejection reason.", "error");
      return;
    }
    rejectAgentMutation.mutate({ agentId: rejectingAgent._id, reason: rejectReason });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Agents</h2>

      {/* Tabs */}
<div className="flex justify-center mb-6 gap-4">
  <button
    className={`tab tab-lg rounded-md px-6 py-2 font-semibold transition-colors duration-300
      ${
        selectedTab === "pending"
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          : "bg-gray-200 text-gray-700 hover:bg-purple-300 hover:text-white"
      }`}
    onClick={() => setSelectedTab("pending")}
  >
    Pending Applications
  </button>
  <button
    className={`tab tab-lg rounded-md px-6 py-2 font-semibold transition-colors duration-300
      ${
        selectedTab === "approved"
          ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg"
          : "bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white"
      }`}
    onClick={() => setSelectedTab("approved")}
  >
    All Current Agents
  </button>
</div>


      {/* Pending Tab */}
      {selectedTab === "pending" && (
        <>
          {loadingPending ? (
            <p>Loading pending applications...</p>
          ) : pendingAgents.length === 0 ? (
            <p className="text-center text-gray-500">No pending agent applications.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Experience</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAgents.map((agent) => (
                    <tr
                      key={agent._id}
                      className="bg-white hover:bg-gray-50 transition rounded-lg shadow mb-2"
                    >
                      <td className="py-3">{agent.fullName}</td>
                      <td className="py-3">{agent.email}</td>
                      <td className="py-3">{agent.phone}</td>
                      <td className="py-3">{agent.city}</td>
                      <td className="py-3">{agent.experience}</td>
                      <td className="py-3">{agent.message}</td>
                      <td className="py-3 flex flex-col sm:flex-row gap-2">
                        <button
                          className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded shadow text-sm"
                          onClick={() => handleApprove(agent._id)}
                          disabled={approveAgentMutation.isLoading}
                        >
                          Approve
                        </button>
                        <button
                          className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded shadow text-sm"
                          onClick={() => handleOpenRejectModal(agent)}
                          disabled={rejectAgentMutation.isLoading}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Approved Tab */}
      {selectedTab === "approved" && (
        <>
          {loadingApproved ? (
            <p>Loading approved agents...</p>
          ) : approvedAgents.length === 0 ? (
            <p className="text-center text-gray-500">No approved agents found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Experience</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedAgents.map((agent) => (
                    <tr
                      key={agent._id}
                      className="bg-white hover:bg-gray-50 transition rounded-lg shadow mb-2"
                    >
                      <td className="py-3">{agent.fullName}</td>
                      <td className="py-3">{agent.email}</td>
                      <td className="py-3">{agent.phone}</td>
                      <td className="py-3">{agent.city}</td>
                      <td className="py-3">{agent.experience}</td>
                      <td className="py-3">{agent.message}</td>
                      <td className="py-3">
                        <button
                          className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow text-sm"
                          onClick={() => handleDemote(agent._id)}
                          disabled={demoteAgentMutation.isLoading}
                        >
                          Demote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Reject Modal */}
      <dialog id="rejectModal" className="modal" open={!!rejectingAgent} onClose={() => setRejectingAgent(null)}>
        <form method="dialog" className="modal-box" onSubmit={(e) => { e.preventDefault(); handleRejectSubmit(); }}>
          <h3 className="font-bold text-lg mb-4">Reject Agent Application</h3>
          <p className="mb-2">
            Please provide a reason for rejecting the application of <strong>{rejectingAgent?.fullName}</strong>:
          </p>
          <textarea
            className="textarea textarea-bordered w-full mb-4"
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Enter rejection reason"
            required
          ></textarea>
          <div className="modal-action">
            <button type="submit" className="btn btn-error">
              Submit Reject
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setRejectingAgent(null);
                setRejectReason("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default MakeAgent;
