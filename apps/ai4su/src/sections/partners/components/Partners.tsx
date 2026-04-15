import { PageHeader } from './PageHeader'
import { FundersSection } from './FundersSection'
import { ImplementingPartnersSection } from './ImplementingPartnersSection'
import { ServiceProvidersSection } from './ServiceProvidersSection'
import type { PartnersPageProps } from '@/../product/sections/partners/types'

export function Partners({
  pageIntro,
  funders,
  europeanPartners,
  implementingPartners,
  serviceProviders,
  challengeProviders,
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

      {challengeProviders && (
        <ServiceProvidersSection
          providers={challengeProviders}
          onProviderClick={onPartnerClick}
        />
      )}

      {/* Service Providers */}
      <ServiceProvidersSection
        providers={serviceProviders}
        onProviderClick={onPartnerClick}
      />

      {europeanPartners && (
        <ServiceProvidersSection
          providers={europeanPartners}
          onProviderClick={onPartnerClick}
        />
      )}
    </div>
  )
}
