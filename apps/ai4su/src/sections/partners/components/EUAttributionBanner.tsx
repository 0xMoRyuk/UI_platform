import { Globe, ExternalLink } from 'lucide-react'
import type { EUAttributionBannerProps } from '@/../product/sections/partners/types'

export function EUAttributionBanner({ attribution }: EUAttributionBannerProps) {
  return (
    <a
      href="https://d4dhub.eu/initiatives/data-governance-in-africa"
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-lg border border-stone-200 dark:border-stone-800 hover:border-brand-primary hover:shadow-xl transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* EU Flag */}
        <div className="shrink-0">
          <div className="w-32 h-24 bg-brand-primary rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="relative w-20 h-20">
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180)
                const x = 50 + 35 * Math.cos(angle)
                const y = 50 + 35 * Math.sin(angle)
                return (
                  <div
                    key={i}
                    className="absolute w-3 h-3 text-brand-accent"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    ★
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-2 group-hover:text-brand-primary-dark transition-colors">
            {attribution.text}
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-2 text-stone-500 dark:text-stone-400">
            <Globe className="w-4 h-4" />
            <span className="text-sm">{attribution.initiative}</span>
          </div>
        </div>

        {/* External link indicator */}
        <ExternalLink className="w-5 h-5 text-stone-300 group-hover:text-brand-primary transition-colors shrink-0" />
      </div>
    </a>
  )
}
