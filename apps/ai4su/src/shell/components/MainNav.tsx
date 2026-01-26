import { Menu, X } from 'lucide-react'
import type { NavigationItem } from './AppShell'

interface MainNavProps {
  navigationItems: NavigationItem[]
  logoText: string
  ctaButton?: {
    label: string
    href: string
    onClick?: () => void
  }
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
  onNavigate?: (href: string) => void
  onCtaClick?: () => void
}

export function MainNav({
  navigationItems,
  logoText,
  ctaButton,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
  onCtaClick,
}: MainNavProps) {
  return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <button
            onClick={() => onNavigate?.(navigationItems[0]?.href || '/')}
            className="text-lg font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {logoText}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              onClick={() => onNavigate?.(item.href)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                item.isActive
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA Button */}
        {ctaButton && (
          <div className="hidden md:block">
            <button
              onClick={onCtaClick}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-md transition-colors shadow-sm"
            >
              {ctaButton.label}
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={onToggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-2">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate?.(item.href)}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  item.isActive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            {ctaButton && (
              <div className="pt-2">
                <button
                  onClick={onCtaClick}
                  className="w-full px-4 py-2 text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-md transition-colors shadow-sm"
                >
                  {ctaButton.label}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
