import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';


const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [roleError, setRoleError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setRoleLoading(true);
      setRoleError(null);
      axios.get(`https://insuroo-server.vercel.app/users/role/${user.email}`)
        .then(res => {
          if (res.data?.role) {
            setRole(res.data.role);
          } else {
            setRole(null);
          }
          setRoleLoading(false);
        })
        .catch(err => {
          setRoleError(err);
          setRoleLoading(false);
        });
    } else {
      setRole(null);
      setRoleLoading(false);
    }
  }, [user?.email]);

  return { role, roleLoading, roleError };
};

export default useUserRole;
