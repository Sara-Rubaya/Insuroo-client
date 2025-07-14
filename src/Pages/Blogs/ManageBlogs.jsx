import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";

import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const ManageBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: blogs = [], refetch, isLoading } = useQuery({
    queryKey: ["agentBlogs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/blogs?authorEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/blogs/${id}`);
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Could not delete blog.", err);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage My Blogs</h2>
        <Link to="/dashboard/add-blog" className="btn btn-primary text-white">
          + Add Blog
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center mt-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Publish Date</th>
                <th>Visits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td>{index + 1}</td>
                  <td>{blog.title}</td>
                  <td>{new Date(blog.publishedAt).toLocaleDateString()}</td>
                  <td>{blog.visits || 0}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/dashboard/edit-blog/${blog._id}`}
                      className="btn btn-sm btn-info text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
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

export default ManageBlogs;
