import { Map, X } from 'lucide-react'
import type { MobileMapToggleProps } from '../types'

export function MobileMapToggle({ isMapVisible, onToggle }: MobileMapToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#003399] text-white
               shadow-lg shadow-[#003399]/30 flex items-center justify-center
               hover:bg-[#002266] transition-colors"
    >
      {isMapVisible ? (
        <X className="w-6 h-6" />
      ) : (
        <Map className="w-6 h-6" />
      )}
    </button>
  )
}
