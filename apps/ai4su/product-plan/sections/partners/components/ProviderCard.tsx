import { ExternalLink, Cloud, Building } from 'lucide-react'
import type { ServiceProvider } from '../types'

interface ProviderCardProps {
  provider: ServiceProvider
  onClick?: () => void
}

export function ProviderCard({ provider, onClick }: ProviderCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 hover:shadow-md hover:border-[#9BB1DC] transition-all duration-200">
      {/* Header with logo */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
          <Cloud className="w-6 h-6 text-[#003399] dark:text-[#9BB1DC]" />
        </div>
        <h3 className="text-lg font-bold text-stone-900 dark:text-white font-[Barlow]">
          {provider.name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">
        {provider.description}
      </p>

      {/* Services tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {provider.services.map((service, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-[#9BB1DC]/20 dark:bg-[#9BB1DC]/10 text-[#003399] dark:text-[#9BB1DC] text-xs font-medium rounded"
          >
            {service}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#003399] dark:text-[#9BB1DC] hover:text-[#F5CE2A] transition-colors"
      >
        Learn More
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
