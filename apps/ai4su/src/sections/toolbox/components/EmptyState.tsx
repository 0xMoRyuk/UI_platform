import { Search, RefreshCcw } from 'lucide-react'
import type { EmptyStateProps } from '@/../product/sections/toolbox/types'

export function EmptyState({ title, description, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-stone-400" />
      </div>
      <h3 className="text-xl font-bold text-[#003399] dark:text-white mb-2 font-[Barlow]">
        {title}
      </h3>
      <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-md">
        {description}
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#003399] text-white font-semibold rounded-lg
                   hover:bg-[#002266] transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Clear Filters
        </button>
      )}
    </div>
  )
}
