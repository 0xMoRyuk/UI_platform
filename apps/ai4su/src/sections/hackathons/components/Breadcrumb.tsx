import { ChevronRight, ArrowLeft } from 'lucide-react'
import type { BreadcrumbProps } from '@/../product/sections/hackathons/types'
import hackathonsDataRaw from '@/../product/sections/hackathons/data.json'

const ui = (hackathonsDataRaw as Record<string, unknown>).ui as Record<string, string>

export function Breadcrumb({ hackathonName, onBackClick }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <button
        onClick={onBackClick}
        className="flex items-center gap-1.5 text-brand-primary dark:text-brand-secondary hover:text-brand-accent transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{ui.breadcrumb}</span>
      </button>
      <ChevronRight className="w-4 h-4 text-stone-400" />
      <span className="text-stone-600 dark:text-stone-400 truncate max-w-[200px] sm:max-w-none">
        {hackathonName}
      </span>
    </nav>
  )
}
