import { Github, ExternalLink } from 'lucide-react'
import type { ModelCardProps } from '../types'

const sectorColors: Record<string, { bg: string; text: string; border: string }> = {
  agriculture: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800' },
  healthcare: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
  fintech: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
  education: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
  environment: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800' },
  logistics: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
}

const countryFlags: Record<string, string> = {
  KE: '🇰🇪',
  NG: '🇳🇬',
  GH: '🇬🇭',
  SN: '🇸🇳',
  RW: '🇷🇼',
  ZA: '🇿🇦',
  EG: '🇪🇬',
  MA: '🇲🇦',
}

export function ModelCard({ model, onClick }: ModelCardProps) {
  const colors = sectorColors[model.sector] || sectorColors.agriculture

  return (
    <button
      onClick={onClick}
      className="group relative bg-white dark:bg-stone-900 rounded-xl p-5 text-left
                 border border-stone-200 dark:border-stone-800
                 hover:border-[#003399] dark:hover:border-[#9BB1DC]
                 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Top row: sector badge + country flag */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
          {model.sector.charAt(0).toUpperCase() + model.sector.slice(1)}
        </span>
        <span className="text-lg" title={model.country}>
          {countryFlags[model.country]}
        </span>
      </div>

      {/* Model name */}
      <h3 className="text-lg font-bold text-[#003399] dark:text-white mb-2 font-[Barlow] group-hover:text-[#F5CE2A] transition-colors line-clamp-1">
        {model.name}
      </h3>

      {/* Short description */}
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
        {model.shortDescription}
      </p>

      {/* GitHub link indicator */}
      <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 group-hover:text-[#003399] dark:group-hover:text-[#9BB1DC] transition-colors">
        <Github className="w-4 h-4" />
        <span>View on GitHub</span>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#003399]/0 to-[#003399]/0 group-hover:from-[#003399]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
    </button>
  )
}
