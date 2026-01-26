'use client'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AppShell } from '@/shell/components'

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Toolbox', href: '/toolbox' },
  { label: 'Hackathons', href: '/hackathons' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Partners', href: '/partners' },
]

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItemsWithActive = navigationItems.map((item) => ({
    ...item,
    isActive: location.pathname === item.href ||
              (item.href !== '/' && location.pathname.startsWith(item.href)),
  }))

  const handleNavigate = (href: string) => {
    navigate(href)
  }

  const handleSearch = (query: string) => {
    navigate(`/toolbox?q=${encodeURIComponent(query)}`)
  }

  return (
    <AppShell
      navigationItems={navItemsWithActive}
      currentLanguage="en"
      onNavigate={handleNavigate}
      onSearch={handleSearch}
    >
      <Outlet />
    </AppShell>
  )
}
