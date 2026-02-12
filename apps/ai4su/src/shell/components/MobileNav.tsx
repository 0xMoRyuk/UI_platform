import { Globe, Search } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@ui-platform/ui/components/sheet'
import { Input } from '@ui-platform/ui/components/input'
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
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-72 bg-brand-primary border-l-brand-primary p-0">
        <SheetHeader className="border-b border-white/10 p-4">
          <SheetTitle className="text-brand-primary-foreground font-bold text-lg font-[Barlow]">
            Menu
          </SheetTitle>
        </SheetHeader>

        {/* Search */}
        <div className="px-4 pb-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            <Input
              type="text"
              placeholder={currentLanguage === 'en' ? 'Search...' : 'Rechercher...'}
              className="pl-10 bg-white/10 border-white/20
                       text-brand-primary-foreground placeholder-white/60 focus-visible:ring-brand-accent"
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
                      ? 'bg-brand-accent text-brand-accent-foreground'
                      : 'text-brand-primary-foreground hover:bg-white/10'
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
        <SheetFooter className="border-t border-white/10 p-4">
          <button
            onClick={() => onLanguageChange?.(currentLanguage === 'en' ? 'fr' : 'en')}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2
                     text-brand-primary-foreground bg-white/10 rounded-md hover:bg-white/20 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">
              {currentLanguage === 'en' ? 'Français' : 'English'}
            </span>
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
