import { Header } from './Header'
import { Footer } from './Footer'

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  currentLanguage?: 'en' | 'fr'
  onNavigate?: (href: string) => void
  onLanguageChange?: (lang: 'en' | 'fr') => void
  onSearch?: (query: string) => void
}

export function AppShell({
  children,
  navigationItems,
  currentLanguage = 'en',
  onNavigate,
  onLanguageChange,
  onSearch,
}: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-stone-950">
      <Header
        navigationItems={navigationItems}
        currentLanguage={currentLanguage}
        onNavigate={onNavigate}
        onLanguageChange={onLanguageChange}
        onSearch={onSearch}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer currentLanguage={currentLanguage} />
    </div>
  )
}
