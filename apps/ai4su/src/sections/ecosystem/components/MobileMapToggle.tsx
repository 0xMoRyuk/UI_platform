import { Map, X } from 'lucide-react'
import type { MobileMapToggleProps } from '@/../product/sections/ecosystem/types'

export function MobileMapToggle({ isMapVisible, onToggle }: MobileMapToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brand-primary text-brand-primary-foreground
               shadow-lg shadow-brand-primary/30 flex items-center justify-center
               hover:bg-brand-primary-dark transition-colors"
    >
      {isMapVisible ? (
        <X className="w-6 h-6" />
      ) : (
        <Map className="w-6 h-6" />
      )}
    </button>
  )
}
