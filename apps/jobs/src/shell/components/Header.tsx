import { useState } from 'react'
import { Briefcase, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MobileNav } from './MobileNav'
import type { NavigationItem } from './AppShell'
import shellData from '@/../product/shell/data.json'

interface HeaderProps {
  navigationItems: NavigationItem[]
  onNavigate: (href: string) => void
  onSearch?: (query: string) => void
}

export function Header({ navigationItems, onNavigate, onSearch }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim())
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-stone-900 text-stone-50 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 font-semibold text-lg hover:text-stone-300 transition-colors"
          >
            <Briefcase className="w-5 h-5" />
            <span>{shellData.header.logo.text}</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate(item.href)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'bg-stone-800 text-white'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search + mobile toggle */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="hidden sm:block">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={shellData.header.searchPlaceholder}
                  className="w-48 h-9 bg-stone-800 border-stone-700 text-stone-50 placeholder:text-stone-400"
                  autoFocus
                  onBlur={() => { if (!searchQuery) setSearchOpen(false) }}
                />
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex text-stone-300 hover:text-white hover:bg-stone-800"
              >
                <Search className="w-4 h-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-stone-300 hover:text-white hover:bg-stone-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        navigationItems={navigationItems}
        onNavigate={(href) => { onNavigate(href); setMobileOpen(false) }}
        onSearch={onSearch}
      />
    </header>
  )
}
