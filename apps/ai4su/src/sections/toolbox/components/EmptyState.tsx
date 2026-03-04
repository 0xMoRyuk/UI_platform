import { Search, RefreshCcw } from 'lucide-react'
import { Button } from '@ui-platform/ui/components/button'
import type { EmptyStateProps } from '@/../product/sections/toolbox/types'
import toolboxDataRaw from '../../../../product/sections/toolbox/data.json'

const ui = (toolboxDataRaw as Record<string, unknown>).ui as Record<string, string>

export function EmptyState({ title, description, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-stone-400" />
      </div>
      <h3 className="text-xl font-bold text-brand-primary dark:text-white mb-2 font-[Barlow]">
        {title}
      </h3>
      <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-md">
        {description}
      </p>
      {onClearFilters && (
        <Button
          onClick={onClearFilters}
          className="gap-2 px-6 py-3 h-auto bg-brand-primary text-brand-primary-foreground font-semibold rounded-lg
                   hover:bg-brand-primary-dark"
        >
          <RefreshCcw className="w-4 h-4" />
          {ui.clearFilters}
        </Button>
      )}
    </div>
  )
}
