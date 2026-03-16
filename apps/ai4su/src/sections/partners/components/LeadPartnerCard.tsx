import { ExternalLink, Building2 } from 'lucide-react'
import { Button } from '@ui-platform/ui/components/button'
import { Avatar, AvatarFallback } from '@ui-platform/ui/components/avatar'
import type { LeadPartnerCardProps } from '@/../product/sections/partners/types'
import partnersDataRaw from '../../../../product/sections/partners/data.json'

const ui = (partnersDataRaw as Record<string, unknown>).ui as Record<string, string>

export function LeadPartnerCard({ partner, onClick }: LeadPartnerCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-brand-primary shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-brand-primary text-brand-primary-foreground p-6">
        <div className="flex items-center gap-4">
          {/* Logo placeholder */}
          <Avatar className="w-20 h-20 rounded-xl">
            <AvatarFallback className="bg-white rounded-xl">
              <Building2 className="w-10 h-10 text-brand-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="inline-block px-3 py-1 bg-brand-accent text-brand-accent-foreground text-xs font-bold rounded-full mb-2">
              {partner.role}
            </span>
            <h3 className="text-2xl font-bold font-[Barlow]">
              {partner.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
          {partner.fullDescription}
        </p>

        {/* CTA */}
        <Button
          onClick={onClick}
          className="gap-2 px-6 py-3 h-auto bg-brand-primary text-brand-primary-foreground font-semibold rounded-lg
                   hover:bg-brand-primary-dark"
        >
          {ui.visitWebsite}
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
