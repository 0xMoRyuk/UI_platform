import { ArrowRight, Trophy } from 'lucide-react'
import { Badge } from '@ui-platform/ui/components/badge'
import type { ModelCardProps } from '@/../product/sections/toolbox/types'
import { countryFlags } from '../../../shared/lookups'
import toolboxDataRaw from '../../../../product/sections/toolbox/data.json'
import hackathonsDataRaw from '../../../../product/sections/hackathons/data.json'

const ui = (toolboxDataRaw as Record<string, unknown>).ui as Record<string, string>

const hackathonNames: Record<string, string> = Object.fromEntries(
  ((hackathonsDataRaw as Record<string, unknown>).hackathons as { id: string; name: string }[])
    .map((h) => [h.id, h.name])
)

export function ModelCard({ model, onClick }: ModelCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-white dark:bg-stone-900 rounded-xl p-5 text-left
                 border border-stone-200 dark:border-stone-800
                 hover:border-brand-primary dark:hover:border-brand-secondary
                 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Top row: sector badge + country flag */}
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline">
          {model.sector.charAt(0).toUpperCase() + model.sector.slice(1)}
        </Badge>
        <span className="text-lg" title={model.country}>
          {countryFlags[model.country]}
        </span>
      </div>

      {/* Model name */}
      <h3 className="text-lg font-bold text-brand-primary dark:text-white mb-2 font-[Barlow] group-hover:text-brand-accent transition-colors line-clamp-1">
        {model.name}
      </h3>

      {/* Short description */}
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
        {model.shortDescription}
      </p>

      {/* Hackathon origin */}
      {model.hackathonId && hackathonNames[model.hackathonId] && (
        <div className="flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 mb-3">
          <Trophy className="w-3 h-3" />
          <span>{hackathonNames[model.hackathonId]}</span>
        </div>
      )}

      {/* Detail link indicator */}
      <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
        <ArrowRight className="w-4 h-4" />
        <span>{ui.viewOnGithub}</span>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
    </button>
  )
}
