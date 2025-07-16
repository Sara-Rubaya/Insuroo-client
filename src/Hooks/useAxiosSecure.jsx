import axios from 'axios';
import { useEffect } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: `https://insuroo-server.vercel.app`,
    withCredentials: true, 
  });

  useEffect(() => {
    
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
