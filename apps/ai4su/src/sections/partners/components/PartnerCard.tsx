import { ExternalLink, Building } from 'lucide-react'
import { Badge } from '@ui-platform/ui/components/badge'
import { Button } from '@ui-platform/ui/components/button'
import { Avatar, AvatarFallback } from '@ui-platform/ui/components/avatar'
import type { PartnerCardProps } from '@/../product/sections/partners/types'
import partnersDataRaw from '../../../../product/sections/partners/data.json'

const ui = (partnersDataRaw as Record<string, unknown>).ui as Record<string, string>

export function PartnerCard({ partner, onClick }: PartnerCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 hover:shadow-lg hover:border-brand-primary transition-all duration-200">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Logo placeholder */}
        <Avatar className="w-16 h-16 rounded-lg shrink-0">
          <AvatarFallback className="bg-stone-100 dark:bg-stone-800 rounded-lg">
            <Building className="w-8 h-8 text-stone-400" />
          </AvatarFallback>
        </Avatar>
        <div>
          <Badge variant="outline" className="text-brand-primary dark:text-brand-secondary mb-1">
            {partner.role}
          </Badge>
          <h3 className="text-xl font-bold text-brand-primary dark:text-white font-[Barlow]">
            {partner.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
        {partner.fullDescription}
      </p>

      {/* CTA */}
      <Button
        variant="link"
        onClick={onClick}
        className="gap-2 p-0 h-auto text-sm font-medium text-brand-primary dark:text-brand-secondary hover:text-brand-accent"
      >
        {ui.visitWebsite}
        <ExternalLink className="w-3.5 h-3.5" />
      </Button>
    </div>
  )
}
