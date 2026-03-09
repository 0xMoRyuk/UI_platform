import { useState } from 'react'
import { Search } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import type { NavigationItem } from './AppShell'
import shellData from '@/../product/shell/data.json'

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  navigationItems: NavigationItem[]
  onNavigate: (href: string) => void
  onSearch?: (query: string) => void
}

export function MobileNav({ open, onOpenChange, navigationItems, onNavigate, onSearch }: MobileNavProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim())
      onOpenChange(false)
      setSearchQuery('')
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="bg-stone-900 border-stone-800 text-stone-50 w-72">
        <SheetHeader>
          <SheetTitle className="text-stone-50">{shellData.header.logo.text}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Search */}
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={shellData.header.searchPlaceholder}
                className="pl-10 bg-stone-800 border-stone-700 text-stone-50 placeholder:text-stone-400"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'bg-stone-800 text-white'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
