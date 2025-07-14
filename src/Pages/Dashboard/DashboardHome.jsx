import React from 'react';

import UserDashboard from './UserDashboard';
import AgentDashboard from './AgentDashboard';
import AdminDashboard from './AdminDashboard';

import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../../../Component/Loading';
import Forbidden from '../Forbidden';

const DashboardHome = () => {
  const { role, roleLoading, roleError } = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (roleError) {
    return <div>Error loading role: {roleError.message}</div>;
  }

  if (role === 'user') {
    return <UserDashboard />;
  } else if (role === 'agent') {
    return <AgentDashboard />;
  } else if (role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;
