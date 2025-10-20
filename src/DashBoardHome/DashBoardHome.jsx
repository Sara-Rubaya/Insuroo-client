import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import LoadingSpinner from '../Components/ LoadingSpinner';
import CustomerDashboard from './CustomerDashboard';
import AgentDashboard from './AgentDashboard';

import Forbidden from '../Pages/Forbidden';
import AdminDashboardHome from '../Pages/Dashboard/AdminDashboardHome';




const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <LoadingSpinner />;
  }

  switch (role) {
    case 'customer':
      return <CustomerDashboard />;
    case 'agent':
      return <AgentDashboard />;
    case 'admin':
      return <AdminDashboardHome></AdminDashboardHome>;
    default:
      return <Forbidden />;
  }
};

export default DashboardHome;
