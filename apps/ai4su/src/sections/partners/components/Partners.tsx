import { PageHeader } from './PageHeader'
import { FundersSection } from './FundersSection'
import { ImplementingPartnersSection } from './ImplementingPartnersSection'
import { ServiceProvidersSection } from './ServiceProvidersSection'
import { DatagovCallout } from './DatagovCallout'
import { SocialLinksBar } from './SocialLinksBar'
import type { PartnersPageProps } from '@/../product/sections/partners/types'

export function Partners({
  pageIntro,
  funders,
  implementingPartners,
  serviceProviders,
  datagovInitiative,
  socialLinks,
  onPartnerClick,
  onDatagovClick,
  onSocialClick,
}: PartnersPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Hero header */}
      <PageHeader intro={pageIntro} />

      {/* Tier 1: Funders (EU & Team Europe) */}
      <FundersSection
        funders={funders}
        onMemberClick={onPartnerClick}
      />

      {/* Tier 2: Implementing Partners */}
      <ImplementingPartnersSection
        partners={implementingPartners}
        onPartnerClick={onPartnerClick}
      />

      {/* Tier 3: Service Providers */}
      <ServiceProvidersSection
        providers={serviceProviders}
        onProviderClick={onPartnerClick}
      />

      {/* DataGov Initiative Callout */}
      <DatagovCallout
        datagov={datagovInitiative}
        onCtaClick={onDatagovClick}
      />

      {/* Social Links */}
      <SocialLinksBar
        links={socialLinks}
        onSocialClick={onSocialClick}
      />
    </div>
  )
}
