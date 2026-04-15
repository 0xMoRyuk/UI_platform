import { ExternalLink, Building2 } from 'lucide-react'
import { Button } from '@ui-platform/ui/components/button'
import { Avatar, AvatarFallback } from '@ui-platform/ui/components/avatar'
import type { LeadPartnerCardProps } from '@/../product/sections/partners/types'
import partnersDataRaw from '../../../../product/sections/partners/data.json'
import { isRenderableImageUrl } from '@/shared/media'

const ui = (partnersDataRaw as Record<string, unknown>).ui as Record<string, string>

export function LeadPartnerCard({ partner, onClick }: LeadPartnerCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-brand-primary bg-white shadow-lg dark:bg-stone-900">
      {/* Header */}
      <div className="bg-brand-primary text-brand-primary-foreground p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20 rounded-xl">
            {isRenderableImageUrl(partner.logoUrl) ? (
              <img
                src={partner.logoUrl}
                alt={`${partner.name} logo`}
                className="h-full w-full rounded-xl object-contain bg-white p-2"
              />
            ) : (
              <AvatarFallback className="bg-white rounded-xl">
                <Building2 className="w-10 h-10 text-brand-primary" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="min-w-0">
            <h3 className="text-2xl font-bold font-[Barlow]">
              {partner.name}
            </h3>
            <span className="mt-2 inline-flex max-w-full rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-brand-accent-foreground">
              {partner.role}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
          {partner.fullDescription}
        </p>

        {/* CTA */}
        <Button
          onClick={onClick}
          className="mt-auto gap-2 h-auto w-fit rounded-lg bg-brand-primary px-6 py-3 font-semibold text-brand-primary-foreground hover:bg-brand-primary-dark"
        >
          {ui.visitWebsite}
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
