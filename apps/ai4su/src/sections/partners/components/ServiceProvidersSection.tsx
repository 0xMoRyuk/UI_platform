import { Wrench } from 'lucide-react'
import { ProviderCard } from './ProviderCard'
import type { ServiceProvidersSectionProps } from '@/../product/sections/partners/types'

export function ServiceProvidersSection({ providers, onProviderClick }: ServiceProvidersSectionProps) {
  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-neutral/50 dark:bg-brand-neutral/10 rounded-full text-sm font-medium text-stone-600 dark:text-stone-400 mb-4">
            <Wrench className="w-4 h-4" />
            <span>Tier 3 - Service Providers</span>
          </div>
          <h2 className="text-3xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-4">
            {providers.sectionTitle}
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {providers.sectionDescription}
          </p>
        </div>

        {/* Provider grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onClick={() => onProviderClick?.(provider.id, provider.websiteUrl)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
