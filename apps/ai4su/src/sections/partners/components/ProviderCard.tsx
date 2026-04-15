import { Cloud } from 'lucide-react'
import { Avatar, AvatarFallback } from '@ui-platform/ui/components/avatar'
import { Badge } from '@ui-platform/ui/components/badge'
import type { ServiceProvider } from '@/../product/sections/partners/types'
import { isRenderableImageUrl } from '@/shared/media'

interface ProviderCardProps {
  provider: ServiceProvider
  onClick?: () => void
}

export function ProviderCard({ provider, onClick }: ProviderCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 hover:border-brand-primary/30 transition-colors"
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12 rounded-lg shrink-0">
          {isRenderableImageUrl(provider.logoUrl) ? (
            <img
              src={provider.logoUrl}
              alt={`${provider.name} logo`}
              className="h-full w-full rounded-lg object-contain bg-white p-1.5"
            />
          ) : (
            <AvatarFallback className="bg-stone-100 dark:bg-stone-800 rounded-lg">
              <Cloud className="w-6 h-6 text-brand-primary dark:text-brand-secondary" />
            </AvatarFallback>
          )}
        </Avatar>

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white font-[Barlow] leading-tight">
            {provider.name}
          </h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {provider.services.map((service, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="max-w-full bg-brand-secondary/20 dark:bg-brand-secondary/10 text-brand-primary dark:text-brand-secondary whitespace-normal break-words text-left leading-tight"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}
