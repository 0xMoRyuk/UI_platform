import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/pages/Layout'
import { HomePage } from '@/pages/HomePage'
import { ToolboxPage } from '@/pages/ToolboxPage'
import { HackathonsPage } from '@/pages/HackathonsPage'
import { HackathonDetailPage } from '@/pages/HackathonDetailPage'
import { EcosystemPage } from '@/pages/EcosystemPage'
import { PartnersPage } from '@/pages/PartnersPage'

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
        path: 'toolbox',
        element: <ToolboxPage />,
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
        path: 'ecosystem',
        element: <EcosystemPage />,
      },
      {
        path: 'partners',
        element: <PartnersPage />,
      },
    ],
  },
])
