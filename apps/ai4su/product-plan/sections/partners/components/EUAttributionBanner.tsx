import { Flag, Globe } from 'lucide-react'
import type { EUAttributionBannerProps } from '../types'

export function EUAttributionBanner({ attribution }: EUAttributionBannerProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-lg border border-stone-200 dark:border-stone-800">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* EU Flag */}
        <div className="shrink-0">
          <div className="w-32 h-24 bg-[#003399] rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* EU flag placeholder - stars circle */}
            <div className="relative w-20 h-20">
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180)
                const x = 50 + 35 * Math.cos(angle)
                const y = 50 + 35 * Math.sin(angle)
                return (
                  <div
                    key={i}
                    className="absolute w-3 h-3 text-[#F5CE2A]"
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
          <h3 className="text-2xl font-bold text-[#003399] dark:text-white font-[Barlow] mb-2">
            {attribution.text}
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-2 text-stone-500 dark:text-stone-400 mb-4">
            <Globe className="w-4 h-4" />
            <span className="text-sm">Global Gateway Initiative</span>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
            {attribution.disclaimer}
          </p>
        </div>
      </div>
    </div>
  )
}
