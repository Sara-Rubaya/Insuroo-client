import axios from 'axios';
import { useEffect } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: `https://insuroo-server.vercel.app`,
    withCredentials: true, // for cookie-based auth
  });

  useEffect(() => {
    // You can optionally add interceptors here if needed
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token'); // optional if using cookies
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
