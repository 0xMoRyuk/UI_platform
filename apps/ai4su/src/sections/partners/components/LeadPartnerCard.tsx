import { ExternalLink, CheckCircle, Building2 } from 'lucide-react'
import type { LeadPartnerCardProps } from '@/../product/sections/partners/types'

export function LeadPartnerCard({ partner, onClick }: LeadPartnerCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-brand-primary shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-brand-primary text-brand-primary-foreground p-6">
        <div className="flex items-center gap-4">
          {/* Logo placeholder */}
          <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center">
            <Building2 className="w-10 h-10 text-brand-primary" />
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-brand-accent text-brand-accent-foreground text-xs font-bold rounded-full mb-2">
              {partner.role}
            </span>
            <h3 className="text-2xl font-bold font-[Barlow]">
              {partner.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
          {partner.fullDescription}
        </p>

        {/* Contributions */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-brand-primary dark:text-brand-secondary uppercase tracking-wide mb-3">
            Key Contributions
          </h4>
          <ul className="space-y-2">
            {partner.contributions.map((contribution, index) => (
              <li key={index} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                <span>{contribution}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-brand-primary-foreground font-semibold rounded-lg
                   hover:bg-brand-primary-dark transition-colors"
        >
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
