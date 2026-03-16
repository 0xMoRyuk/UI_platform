import { ProviderCard } from './ProviderCard'
import type { ServiceProvidersSectionProps } from '@/../product/sections/partners/types'

export function ServiceProvidersSection({ providers, onProviderClick }: ServiceProvidersSectionProps) {
  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
