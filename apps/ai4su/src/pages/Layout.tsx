'use client'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AppShell } from '@/shell/components'
import shellData from '@/../product/shell/data.json'

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItemsWithActive = shellData.navigation.map((item) => ({
    ...item,
    isActive: location.pathname === item.href ||
              (item.href !== '/' && location.pathname.startsWith(item.href)),
  }))

  const handleNavigate = (href: string) => {
    navigate(href)
  }

  const handleSearch = (query: string) => {
    navigate(`/deliverables?q=${encodeURIComponent(query)}`)
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
