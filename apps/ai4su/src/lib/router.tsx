import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/pages/Layout'
import { HomePage } from '@/pages/HomePage'
import { ModelsPage } from '@/pages/ModelsPage'
import { ModelDetailPage } from '@/pages/ModelDetailPage'
import { HackathonsPage } from '@/pages/HackathonsPage'
import { HackathonDetailPage } from '@/pages/HackathonDetailPage'
import { EcosystemPage } from '@/pages/EcosystemPage'
import { PartnersPage } from '@/pages/PartnersPage'
import { DatagovPage } from '@/pages/DatagovPage'

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
        path: 'models',
        element: <ModelsPage />,
      },
      {
        path: 'models/:id',
        element: <ModelDetailPage />,
      },
      {
        path: 'deliverables',
        element: <Navigate to="/models" replace />,
      },
      {
        path: 'hackathons',
        element: <HackathonsPage />,
      },
      {
        path: 'hackathons/:slug',
        element: <HackathonDetailPage />,
      },
      {
        path: 'activities',
        element: <EcosystemPage />,
      },
      {
        path: 'partners',
        element: <PartnersPage />,
      },
      {
        path: 'datagov',
        element: <DatagovPage />,
      },
    ],
  },
])
