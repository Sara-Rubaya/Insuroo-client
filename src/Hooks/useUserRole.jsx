import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';

import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, roleLoading };
};

export default useUserRole;
