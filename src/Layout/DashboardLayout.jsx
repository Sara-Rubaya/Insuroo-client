import React, { useContext } from 'react';

import { AuthContext } from '../Contexts/AuthContext/AuthProvider';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

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
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
              </a>
            </div>
            <div className="flex items-center ms-3">
              <div>
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
            <li>
              <a href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a href="/dashboard/make-agent" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0v1H5v-1z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Make Agent</span>
              </a>
            </li>
            <li>
              <a href="/dashboard/myPolicies" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0v1H5v-1z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">My Policies</span>
              </a>
            </li>

            {/* Add more links here as needed */}
          </ul>
        </div>
      </aside>

      {/* Page Content */}
      <div className="sm:ml-64 pt-20 p-4 min-h-screen bg-gray-50 ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
