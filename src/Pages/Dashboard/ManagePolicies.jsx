// src/Pages/Dashboard/Admin/ManagePolicies.jsx

import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManagePolicies = () => {
  const axiosSecure = useAxiosSecure();
  const [policies, setPolicies] = useState([]);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const res = await axiosSecure.get("/api/policies");
    setPolicies(res.data);
  };

  const onSubmit = async (data) => {
    if (editingPolicy) {
      // update
      const res = await axiosSecure.patch(`/api/policies/${editingPolicy._id}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Policy updated successfully.", "success");
        setEditingPolicy(null);
        fetchPolicies();
        reset();
      }
    } else {
      // add
      const res = await axiosSecure.post("/api/policies", {
        ...data,
        visits: 0,
        publishedDate: new Date(),
      });
      if (res.data.insertedId) {
        Swal.fire("Added!", "New policy added successfully.", "success");
        fetchPolicies();
        reset();
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this policy?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/api/policies/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Policy removed successfully.", "success");
        fetchPolicies();
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Policies</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">

        <input
         {...register("title")} 
         placeholder="Policy Title" 
         className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
         required 
         defaultValue={editingPolicy?.title} />

        <input
         {...register("category")} 
         placeholder="Category (Term Life, Senior)" 
         className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
         required 
         defaultValue={editingPolicy?.category} />


        <input
         {...register("minAge")}
          type="number" 
          placeholder="Minimum Age" 
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
           required
            defaultValue={editingPolicy?.minAge} />

        <input
         {...register("maxAge")}
          type="number"
           placeholder="Maximum Age" 
           className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" r
           equired 
           defaultValue={editingPolicy?.maxAge} />

        <input
         {...register("coverageRange")} 
         placeholder="Coverage Range (e.g., 5-25 Lakh)" 
         className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
          defaultValue={editingPolicy?.coverageRange} />

        <input
         {...register("durationOptions")} 
         placeholder="Duration (e.g., 10/20/30 Years)"className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
         required 
         defaultValue={editingPolicy?.durationOptions} />

        <input 
        {...register("basePremiumRate")} 
        placeholder="Base Premium Rate (e.g., 0.35)" 
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
         required
          defaultValue={editingPolicy?.basePremiumRate} />


        <input
         {...register("image")} 
         placeholder="Image URL" 
         className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
         required
          defaultValue={editingPolicy?.image} />

        <textarea 
        {...register("description")} 
        placeholder="Description"
         className="textarea border-gray-300 rounded textarea-bordered md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
          defaultValue={editingPolicy?.description} />

        <button type="submit" className="items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          {editingPolicy ? "Update Policy" : "Add Policy"} 
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto mt-8">
  <table className="table w-full bg-white shadow-md rounded-xl">
    <thead>
      <tr className="bg-purple-100">
        <th className="py-3 px-4 text-left">Title</th>
        <th className="py-3 px-4 text-left">Category</th>
        <th className="py-3 px-4 text-left">Coverage</th>
        <th className="py-3 px-4 text-left">Age</th>
        <th className="py-3 px-4 text-left">Duration</th>
        <th className="py-3 px-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {policies.map((policy) => (
        <tr
          key={policy._id}
          className="mb-4 bg-white shadow rounded-lg"
          style={{ display: 'table-row', marginBottom: '1rem' }} // gap like space
        >
          <td className="py-3 px-4">{policy.title}</td>
          <td className="py-3 px-4">{policy.category}</td>
          <td className="py-3 px-4">{policy.coverageRange}</td>
          <td className="py-3 px-4">{policy.minAge} - {policy.maxAge}</td>
          <td className="py-3 px-4">{policy.durationOptions}</td>
          <td className="flex gap-2 py-3 px-4">
            <button
              className="btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 text-base"
              onClick={() => setEditingPolicy(policy)}
              title="Edit Policy"
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 text-base"
              onClick={() => handleDelete(policy._id)}
              title="Delete Policy"
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ManagePolicies;
