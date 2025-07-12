import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Router/Router.jsx'
import { RouterProvider } from 'react-router'
import 'flowbite';
import 'aos/dist/aos.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx'
import Aos from 'aos'

const queryClient = new QueryClient();

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
