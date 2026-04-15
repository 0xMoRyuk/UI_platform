import { ExternalLink, Building } from 'lucide-react'
import { Badge } from '@ui-platform/ui/components/badge'
import { Button } from '@ui-platform/ui/components/button'
import { Avatar, AvatarFallback } from '@ui-platform/ui/components/avatar'
import type { PartnerCardProps } from '@/../product/sections/partners/types'
import partnersDataRaw from '../../../../product/sections/partners/data.json'
import { isRenderableImageUrl } from '@/shared/media'

const ui = (partnersDataRaw as Record<string, unknown>).ui as Record<string, string>

export function PartnerCard({ partner, onClick }: PartnerCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-6 transition-all duration-200 hover:border-brand-primary hover:shadow-lg dark:border-stone-800 dark:bg-stone-900">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-16 h-16 rounded-lg shrink-0">
          {isRenderableImageUrl(partner.logoUrl) ? (
            <img
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              className="h-full w-full rounded-lg object-contain bg-white p-2"
            />
          ) : (
            <AvatarFallback className="bg-stone-100 dark:bg-stone-800 rounded-lg">
              <Building className="w-8 h-8 text-stone-400" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-brand-primary dark:text-white font-[Barlow]">
            {partner.name}
          </h3>
          <Badge variant="outline" className="mt-2 max-w-full text-brand-primary dark:text-brand-secondary">
            {partner.role}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-400">
        {partner.fullDescription}
      </p>

      {/* CTA */}
      <Button
        variant="link"
        onClick={onClick}
        className="mt-auto h-auto w-fit gap-2 p-0 text-sm font-medium text-brand-primary hover:text-brand-accent dark:text-brand-secondary"
      >
        {ui.visitWebsite}
        <ExternalLink className="w-3.5 h-3.5" />
      </Button>
    </div>
  )
}
