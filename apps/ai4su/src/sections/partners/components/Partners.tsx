import { PageHeader } from './PageHeader'
import { FundersSection } from './FundersSection'
import { ImplementingPartnersSection } from './ImplementingPartnersSection'
import { ServiceProvidersSection } from './ServiceProvidersSection'
import type { PartnersPageProps } from '@/../product/sections/partners/types'

export function Partners({
  pageIntro,
  funders,
  implementingPartners,
  serviceProviders,
  onPartnerClick,
}: PartnersPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Hero header */}
      <PageHeader intro={pageIntro} />

      {/* Funders (EU Attribution) */}
      <FundersSection
        funders={funders}
        onMemberClick={onPartnerClick}
      />

      {/* Implementing Partners */}
      <ImplementingPartnersSection
        partners={implementingPartners}
        onPartnerClick={onPartnerClick}
      />

      {/* Service Providers */}
      <ServiceProvidersSection
        providers={serviceProviders}
        onProviderClick={onPartnerClick}
      />
    </div>
  )
}
