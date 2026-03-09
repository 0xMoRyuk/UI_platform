import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

export interface AppShellProps {
  navigationItems: NavigationItem[]
  onNavigate: (href: string) => void
  onSearch?: (query: string) => void
  children: ReactNode
}

export function AppShell({ navigationItems, onNavigate, onSearch, children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        navigationItems={navigationItems}
        onNavigate={onNavigate}
        onSearch={onSearch}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
