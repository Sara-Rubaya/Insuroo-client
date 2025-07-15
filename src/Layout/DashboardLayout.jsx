import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';
import { Outlet } from 'react-router';
import useUserRole from '../Hooks/useUserRole';


const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <div className="text-center pt-32 text-lg font-semibold">Loading dashboard...</div>;
  }

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <img src="https://i.ibb.co/xK0tyB1q/Whats-App-Image-2025-07-13-at-22-52-57.jpg" className="h-8 me-3" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Insuroo</span>
              </a>
            </div>
            <div className="flex items-center ms-3">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="user" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">

            {/* ---------- CUSTOMER MENU ---------- */}
            {role === 'customer' && (
              <>
                <li>
                  <a href="/dashboard/myPolicies" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3">My Policies</span>
                  </a>
                </li>
                <li>
                  <a href="/dashboard/payment" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3">Payment Page</span>
                  </a>
                </li>
                <li>
                  <a href="/dashboard/claim" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3">Claim</span>
                  </a>
                </li>
              </>
            )}

            {/* ---------- ADMIN MENU ---------- */}
            {role === 'admin' && (
              <>
                <li>
                  <a href="/dashboard/manageApplications" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3">Manage Applications</span>
                  </a>
                </li>
                <li>
                  <a href="/dashboard/manageUsers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3">Manage Users</span>
                  </a>
                </li>
                <li>
                  <a href="/dashboard/managePolicy" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3">Manage Policies</span>
                  </a>
                </li>
                <li>
                  <a href="/dashboard/make-agent" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3">Manage Agents</span>
                  </a>
                </li>
                <li>
                  <a href="/dashboard/manageTransactions" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3">Manage Transactions</span>
                  </a>
                </li>
              </>
            )}

            {/* ---------- AGENT MENU ---------- */}
            {/* ---------- AGENT MENU ---------- */}
{!roleLoading && role?.toLowerCase() === 'agent' && (
  <>
    <li>
      <a href="/dashboard/assignedCustomers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <span className="ms-3">Assigned Customers</span>
      </a>
    </li>
    <li>
      <a href="/dashboard/manage-blogs" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <span className="ms-3">Manage Blogs</span>
      </a>
    </li>
    <li>
      <a href="/dashboard/addBlogs" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <span className="ms-3">Add Blog</span>
      </a>
    </li>
  </>
)}


            {/* ---------- COMMON FOR ALL ---------- */}
            <li>
              <a href="/profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3">Users</span>
              </a>
            </li>

          </ul>
        </div>
      </aside>

      <div className="pt-20 pl-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
