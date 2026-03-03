import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/lib/router'

// Register WebMCP tools if browser supports it (non-blocking)
import('@/agent/webmcp').then(({ registerWebMCPTools }) => registerWebMCPTools()).catch(() => {})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
