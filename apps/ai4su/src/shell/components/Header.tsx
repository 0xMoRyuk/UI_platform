import { useState } from 'react'
import { Menu, Search, X, Globe } from 'lucide-react'
import { Input } from '@ui-platform/ui/components/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui-platform/ui/components/dropdown-menu'
import { MobileNav } from './MobileNav'
import type { NavigationItem } from './AppShell'

interface HeaderProps {
  navigationItems: NavigationItem[]
  currentLanguage: 'en' | 'fr'
  onNavigate?: (href: string) => void
  onLanguageChange?: (lang: 'en' | 'fr') => void
  onSearch?: (query: string) => void
}

export function Header({
  navigationItems,
  currentLanguage,
  onNavigate,
  onLanguageChange,
  onSearch,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-primary text-brand-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => onNavigate?.('/')}
                className="font-bold text-xl tracking-tight font-[Barlow]"
              >
                AI4Startups
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => onNavigate?.(item.href)}
                  className={`
                    px-4 py-2 text-sm font-medium font-[Barlow] rounded-md
                    transition-colors duration-200
                    ${item.isActive
                      ? 'text-brand-accent border-b-2 border-brand-accent'
                      : 'text-brand-primary-foreground/90 hover:text-brand-primary-foreground hover:bg-white/10'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side: Search + Language + Mobile menu */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="hidden sm:flex items-center">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={currentLanguage === 'en' ? 'Search models...' : 'Rechercher...'}
                    className="w-48 rounded-r-none bg-white/10 border-white/20
                             text-brand-primary-foreground placeholder-white/60 focus-visible:ring-brand-accent"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="px-2 py-1.5 bg-white/10 border border-l-0 border-white/20 rounded-r-md
                             hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="hidden sm:flex items-center space-x-1 px-3 py-1.5 text-sm font-medium
                             rounded-md hover:bg-white/10 transition-colors"
                    aria-label="Switch language"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="uppercase">{currentLanguage}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onLanguageChange?.('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onLanguageChange?.('fr')}>
                    Français
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        currentLanguage={currentLanguage}
        onNavigate={(href) => {
          onNavigate?.(href)
          setIsMobileMenuOpen(false)
        }}
        onLanguageChange={onLanguageChange}
        onSearch={onSearch}
      />
    </>
  )
}
