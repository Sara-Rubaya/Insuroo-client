import React, { useContext } from "react";

import { AuthContext } from "../Contexts/AuthContext/AuthProvider";
import useUserRole from "../Hooks/useUserRole";
import AdminDashboardHome from "../Pages/Dashboard/AdminDashboardHome";
import AgentDashboard from "../DashBoardHome/AgentDashboard";
import CustomerDashboard from "../DashBoardHome/CustomerDashboard";
import { NavLink, Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (roleLoading) {
    return (
      <div className="text-center pt-32 text-lg font-semibold">
        Loading dashboard...
      </div>
    );
  }

  const activeClass =
    "flex items-center p-2 rounded-lg dark:text-white bg-gray-200 dark:bg-gray-700";
  const normalClass =
    "flex items-center p-2 rounded-lg dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group";

  const renderDashboardHome = () => {
    if (role === "admin") return <AdminDashboardHome />;
    if (role === "agent") return <AgentDashboard />;
    if (role === "customer") return <CustomerDashboard />;
    return <div className="p-8 text-center">Role not recognized</div>;
  };

  return (
    <div>
      {/* Navbar */}
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
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <NavLink to="/" className="flex ms-2 md:me-24">
                <img
                  src="https://i.ibb.co/xK0tyB1q/Whats-App-Image-2025-07-13-at-22-52-57.jpg"
                  className="h-8 me-3"
                  alt="Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Insuroo
                </span>
              </NavLink>
            </div>
            <div className="flex items-center ms-3">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.photoURL}
                  alt="user"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {/* ---------- CUSTOMER MENU ---------- */}
            {role === "customer" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/myPolicies"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">My Policies</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/payment"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Payment Page</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/claimForm"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Claim</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ---------- ADMIN MENU ---------- */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/admin-home"
                    end
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Dashboard Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageApplications"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Manage Applications</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageUsers"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Manage Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/managePolicy"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Manage Policies</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/make-agent"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Manage Agents</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageTransactions"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Manage Transactions</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ---------- AGENT MENU ---------- */}
            {role === "agent" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assignedCustomers"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Assigned Customers</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-blogs"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Manage Blogs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addBlogs"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    <span className="ms-3">Add Blog</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ---------- COMMON ---------- */}
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                <span className="ms-3">Users</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pt-20 pl-64">
        {/* Outlet renders child routes */}
        <Outlet />
        {/* Default role-based home */}
        {location.pathname === "/dashboard" && renderDashboardHome()}
      </div>
    </div>
  );
};

export default DashboardLayout;
