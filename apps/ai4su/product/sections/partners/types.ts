// =============================================================================
// Data Types
// =============================================================================

export interface PageIntro {
  title: string
  subtitle: string
  description: string
}

export interface EUAttribution {
  text: string
  flagUrl: string
  globalGatewayLogo: string
  disclaimer: string
  initiative: string
}

export interface TeamEuropeMember {
  id: string
  name: string
  logoUrl: string
  websiteUrl: string
  isPrimary: boolean
}

export interface TeamEurope {
  title: string
  description: string
  members: TeamEuropeMember[]
}

export interface Funders {
  sectionTitle: string
  sectionDescription: string
  euAttribution: EUAttribution
  teamEurope: TeamEurope
  hashtags: string[]
}

export interface ImplementingPartner {
  id: string
  name: string
  role: string
  logoUrl: string
  websiteUrl: string
  shortDescription: string
  fullDescription: string
  contributions: string[]
  isLead: boolean
}

export interface ImplementingPartners {
  sectionTitle: string
  sectionDescription: string
  partners: ImplementingPartner[]
}

export interface ServiceProvider {
  id: string
  name: string
  logoUrl: string
  websiteUrl: string
  description: string
  services: string[]
}

export interface ServiceProviders {
  sectionTitle: string
  sectionDescription: string
  providers: ServiceProvider[]
}

export interface DatagovInitiative {
  title: string
  description: string
  websiteUrl: string
  ctaText: string
  highlights: string[]
}

export interface SocialLinks {
  hashtags: string[]
  twitter: string
  linkedin: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface PartnersPageProps {
  /** Page header content */
  pageIntro: PageIntro
  /** EU/Team Europe funding section */
  funders: Funders
  /** Implementing partners section */
  implementingPartners: ImplementingPartners
  /** Service providers section */
  serviceProviders: ServiceProviders
  /** DataGov Initiative callout */
  datagovInitiative: DatagovInitiative
  /** Social media links */
  socialLinks: SocialLinks
  /** Called when user clicks partner logo or website link */
  onPartnerClick?: (partnerId: string, websiteUrl: string) => void
  /** Called when user clicks DataGov CTA */
  onDatagovClick?: (url: string) => void
  /** Called when user clicks social link */
  onSocialClick?: (platform: 'twitter' | 'linkedin') => void
}

// =============================================================================
// Sub-component Props
// =============================================================================

export interface PageHeaderProps {
  intro: PageIntro
}

export interface FundersSectionProps {
  funders: Funders
  onMemberClick?: (memberId: string, url: string) => void
}

export interface EUAttributionBannerProps {
  attribution: EUAttribution
}

export interface TeamEuropeGridProps {
  teamEurope: TeamEurope
  onMemberClick?: (memberId: string, url: string) => void
}

export interface ImplementingPartnersSectionProps {
  partners: ImplementingPartners
  onPartnerClick?: (partnerId: string, url: string) => void
}

export interface LeadPartnerCardProps {
  partner: ImplementingPartner
  onClick?: () => void
}

export interface PartnerCardProps {
  partner: ImplementingPartner
  onClick?: () => void
}

export interface ServiceProvidersSectionProps {
  providers: ServiceProviders
  onProviderClick?: (providerId: string, url: string) => void
}

export interface ProviderLogoGridProps {
  providers: ServiceProvider[]
  onProviderClick?: (providerId: string, url: string) => void
}

export interface DatagovCalloutProps {
  datagov: DatagovInitiative
  onCtaClick?: (url: string) => void
}

export interface HashtagsDisplayProps {
  hashtags: string[]
}

export interface SocialLinksProps {
  links: SocialLinks
  onSocialClick?: (platform: 'twitter' | 'linkedin') => void
}
