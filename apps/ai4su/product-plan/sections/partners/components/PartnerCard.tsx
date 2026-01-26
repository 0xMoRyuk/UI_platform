import { ExternalLink, CheckCircle, Building } from 'lucide-react'
import type { PartnerCardProps } from '../types'

export function PartnerCard({ partner, onClick }: PartnerCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 hover:shadow-lg hover:border-[#003399] transition-all duration-200">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Logo placeholder */}
        <div className="w-16 h-16 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
          <Building className="w-8 h-8 text-stone-400" />
        </div>
        <div>
          <span className="inline-block px-2 py-0.5 bg-[#003399]/10 dark:bg-[#003399]/20 text-[#003399] dark:text-[#9BB1DC] text-xs font-medium rounded mb-1">
            {partner.role}
          </span>
          <h3 className="text-xl font-bold text-[#003399] dark:text-white font-[Barlow]">
            {partner.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
        {partner.fullDescription}
      </p>

      {/* Contributions */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-500 uppercase tracking-wide mb-2">
          Contributions
        </h4>
        <ul className="space-y-1">
          {partner.contributions.slice(0, 3).map((contribution, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
              <span>{contribution}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#003399] dark:text-[#9BB1DC] hover:text-[#F5CE2A] transition-colors"
      >
        Visit Website
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
