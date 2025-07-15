import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import LoadingSpinner from '../Components/ LoadingSpinner';
import CustomerDashboard from './CustomerDashboard';
import AgentDashboard from './AgentDashboard';
import AdminDashboard from './AdminDashboard';
import Forbidden from '../Pages/Forbidden';




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
      return <AdminDashboard />;
    default:
      return <Forbidden />;
  }
};

export default DashboardHome;
