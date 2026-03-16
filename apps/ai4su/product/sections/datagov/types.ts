// =============================================================================
// Data Types
// =============================================================================

export interface HeroStat {
  value: string
  label: string
}

export interface DatagovHero {
  badge: string
  title: string
  subtitle: string
  investment: string
  stats: HeroStat[]
}

export interface DatagovAbout {
  title: string
  description: string
  background: string[]
}

export interface StrategyLevel {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

export interface DatagovStrategy {
  title: string
  description: string
  levels: StrategyLevel[]
}

export interface ActivityItem {
  id: string
  title: string
  icon: string
  description: string
}

export interface DatagovActivities {
  title: string
  description: string
  items: ActivityItem[]
}

export interface Funder {
  id: string
  name: string
  flag: string
}

export interface ImplementingPartner {
  id: string
  name: string
  websiteUrl: string
}

export interface DatagovPartners {
  sectionTitle: string
  funders: {
    title: string
    members: Funder[]
  }
  implementingPartners: {
    title: string
    members: ImplementingPartner[]
  }
}

export interface Factsheet {
  title: string
  description: string
  url: string
  ctaText: string
}

export interface DatagovResources {
  title: string
  factsheet: Factsheet
}

// =============================================================================
// Component Props
// =============================================================================

export interface DatagovPageProps {
  hero: DatagovHero
  about: DatagovAbout
  strategy: DatagovStrategy
  activities: DatagovActivities
  partners: DatagovPartners
  onPartnerClick?: (partnerId: string, websiteUrl: string) => void
}

export interface DatagovHeroProps {
  hero: DatagovHero
}

export interface AboutSectionProps {
  about: DatagovAbout
}

export interface StrategySectionProps {
  strategy: DatagovStrategy
}

export interface ActivitiesSectionProps {
  activities: DatagovActivities
}

export interface PartnersStripProps {
  partners: DatagovPartners
  onPartnerClick?: (partnerId: string, websiteUrl: string) => void
}
