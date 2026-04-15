import { Globe, ExternalLink } from 'lucide-react'
import type { EUAttributionBannerProps } from '@/../product/sections/partners/types'
import { isRenderableImageUrl } from '@/shared/media'

export function EUAttributionBanner({ attribution }: EUAttributionBannerProps) {
  return (
    <a
      href="https://d4dhub.eu/initiatives/data-governance-in-africa"
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-lg border border-stone-200 dark:border-stone-800 hover:border-brand-primary hover:shadow-xl transition-all duration-200"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex h-24 items-center justify-center rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
            {isRenderableImageUrl(attribution.flagUrl) ? (
              <img
                src={attribution.flagUrl}
                alt="European Union flag"
                className="h-full w-full rounded-md object-contain"
              />
            ) : null}
          </div>

          <div className="flex h-24 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
            {isRenderableImageUrl(attribution.globalGatewayLogo) ? (
              <img
                src={attribution.globalGatewayLogo}
                alt="Global Gateway and Data Governance in Africa logos"
                className="max-h-14 w-full object-contain"
              />
            ) : (
              <span className="text-sm font-medium text-stone-500">
                Global Gateway
              </span>
            )}
          </div>

          <div className="flex h-24 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
            {isRenderableImageUrl(attribution.dataGovLogo) ? (
              <img
                src={attribution.dataGovLogo}
                alt="Data Governance in Africa logo"
                className="max-h-16 w-full object-contain"
              />
            ) : (
              <span className="text-sm font-medium text-stone-500">
                Data Governance in Africa
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 text-left">
            <h3 className="mb-2 font-[Barlow] text-2xl font-bold text-brand-primary transition-colors group-hover:text-brand-primary-dark dark:text-white">
              {attribution.text}
            </h3>
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
              <Globe className="h-4 w-4 shrink-0" />
              <span className="text-sm">{attribution.initiative}</span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              {attribution.disclaimer}
            </p>
          </div>

          <ExternalLink className="h-5 w-5 shrink-0 text-stone-300 transition-colors group-hover:text-brand-primary" />
        </div>
      </div>
    </a>
  )
}
