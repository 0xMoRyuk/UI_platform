import { ProviderCard } from './ProviderCard'
import type { ServiceProvidersSectionProps } from '@/../product/sections/partners/types'

export function ServiceProvidersSection({ providers, onProviderClick }: ServiceProvidersSectionProps) {
  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-3">
            {providers.sectionTitle}
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
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
