import { Cloud } from 'lucide-react'
import { Avatar, AvatarFallback } from '@ui-platform/ui/components/avatar'
import { Badge } from '@ui-platform/ui/components/badge'
import type { ServiceProvider } from '@/../product/sections/partners/types'

interface ProviderCardProps {
  provider: ServiceProvider
  onClick?: () => void
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5">
      {/* Header with logo */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-12 h-12 rounded-lg shrink-0">
          <AvatarFallback className="bg-stone-100 dark:bg-stone-800 rounded-lg">
            <Cloud className="w-6 h-6 text-brand-primary dark:text-brand-secondary" />
          </AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-bold text-stone-900 dark:text-white font-[Barlow]">
          {provider.name}
        </h3>
      </div>

      {/* Services tags */}
      <div className="flex flex-wrap gap-1.5">
        {provider.services.map((service, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-brand-secondary/20 dark:bg-brand-secondary/10 text-brand-primary dark:text-brand-secondary"
          >
            {service}
          </Badge>
        ))}
      </div>
    </div>
  )
}
