import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ApplyPage } from '@/pages/ApplyPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/apply" replace />,
  },
  {
    path: '/apply',
    element: <ApplyPage />,
  },
])
