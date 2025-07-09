
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';


const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
