import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/pages/Layout'
import { HomePage } from '@/pages/HomePage'
import { JobsPage } from '@/pages/JobsPage'
import { JobDetailPage } from '@/pages/JobDetailPage'
import { CompaniesPage } from '@/pages/CompaniesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'jobs',
        element: <JobsPage />,
      },
      {
        path: 'jobs/:slug',
        element: <JobDetailPage />,
      },
      {
        path: 'companies',
        element: <CompaniesPage />,
      },
    ],
  },
])
