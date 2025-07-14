import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

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
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Insuroo</span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="user photo" />
                  </button>
                </div>
              </div>
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
            
            
             <li>
  <a href="/dashboard/myPolicies" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a5 5 0 100 10 5 5 0 000-10z" />
      <path d="M5 20a7 7 0 0114 0v1H5v-1z" />
    </svg>
    <span className="ms-3">My Policies</span>
  </a>
</li>
<li>
  <a href="/dashboard/review" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
    <span className="ms-3">Give Review</span>
  </a>
</li>


<li>
  <a href="/dashboard/payment" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm-1-15h2v4h2v2h-4V7zm0 6h2v2h-2v-2z" />
    </svg>
    <span className="ms-3">Payment Page</span>
  </a>
</li>
<li>
  <a href="/dashboard/myPolicies" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 7h-6l-2-2H5c-1.1 0-2 .9-2 2v12a2 2 0 002 2h14a2 2 0 002-2V9c0-1.1-.9-2-2-2z" />
    </svg>
    <span className="ms-3">Claim</span>
  </a>
</li>

   {/* admin */}
        <li>
  <a href="/dashboard/manageApplications" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 4h14v2H5zM5 8h14v2H5zM5 12h10v2H5zM5 16h10v2H5z" />
    </svg>
    <span className="ms-3">Manage Applications</span>
  </a>
</li>

<li>
  <a href="/dashboard/manageUsers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
    </svg>
    <span className="ms-3">Manage Users</span>
  </a>
</li>

<li>
  <a href="/dashboard/managePolicy" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 6v15h18V6H3zm16 13H5V8h14v11zm-5-9H8v2h6v-2z" />
    </svg>
    <span className="ms-3">Manage Policies</span>
  </a>
</li>

<li>
  <a href="/dashboard/make-agent" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
    </svg>
    <span className="ms-3">Manage Agents</span>
  </a>
</li>

<li>
  <a href="/dashboard/manage-transactions" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 4h18v2H3zm0 6h12v2H3zm0 6h18v2H3z" />
    </svg>
    <span className="ms-3">Manage Transactions</span>
  </a>
</li>

<li>
  <a href="/dashboard/earnings-chart" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 22h16v-2H4v2zM7 13h2v5H7v-5zm4-3h2v8h-2V10zm4-4h2v12h-2V6z" />
    </svg>
    <span className="ms-3">Earnings Chart</span>
  </a>
</li>



{/* agent */}

<li>
  <a href="/dashboard/assigned-customers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
    </svg>
    <span className="ms-3">Assigned Customers</span>
  </a>
</li>

<li>
  <a href="/dashboard/manage-blogs" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 4v16h16V4H4zm14 14H6V6h12v12zM8 8h8v2H8zm0 4h8v2H8z" />
    </svg>
    <span className="ms-3">Manage Blogs</span>
  </a>
</li>

<li>
  <a href="/dashboard/add-blog" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
    <span className="ms-3">Add Blog</span>
  </a>
</li>



       
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
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
