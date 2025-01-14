import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Components/Shared/Router/Router.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvaider from './Components/AuthenTication/AuthProvaider/AuthProvaider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvaider>
        <QueryClientProvider client={QueryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>,
        <Toaster />
      </AuthProvaider>
    </HelmetProvider>
  </StrictMode>,
)
