import { X, Globe, Search } from 'lucide-react'
import type { NavigationItem } from './AppShell'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navigationItems: NavigationItem[]
  currentLanguage: 'en' | 'fr'
  onNavigate?: (href: string) => void
  onLanguageChange?: (lang: 'en' | 'fr') => void
  onSearch?: (query: string) => void
}

export function MobileNav({
  isOpen,
  onClose,
  navigationItems,
  currentLanguage,
  onNavigate,
  onLanguageChange,
}: MobileNavProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-72 bg-[#003399] shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-white font-bold text-lg font-[Barlow]">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-md hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search...' : 'Rechercher...'}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white/10 border border-white/20 rounded-md
                         text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5CE2A]"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => onNavigate?.(item.href)}
                    className={`
                      w-full text-left px-4 py-3 rounded-md font-medium font-[Barlow]
                      transition-colors duration-200
                      ${item.isActive
                        ? 'bg-[#F5CE2A] text-[#003399]'
                        : 'text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Switcher */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => onLanguageChange?.(currentLanguage === 'en' ? 'fr' : 'en')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2
                       text-white bg-white/10 rounded-md hover:bg-white/20 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">
                {currentLanguage === 'en' ? 'Français' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
