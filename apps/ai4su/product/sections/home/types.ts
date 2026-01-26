// =============================================================================
// Data Types
// =============================================================================

export interface Hero {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

export interface KPI {
  id: string
  label: string
  value: number
  suffix: string
  description: string
  link: string
  icon: 'brain' | 'trophy' | 'globe' | 'users' | 'book' | 'calendar'
}

export interface FeaturedModel {
  id: string
  name: string
  description: string
  sector: 'Agriculture' | 'Healthcare' | 'FinTech' | 'Education' | 'Environment' | 'Logistics'
  githubUrl: string
  hackathonId?: string
}

export interface SectionPreview {
  id: string
  title: string
  description: string
  imageUrl: string
  link: string
  stats: string
}

export interface Country {
  name: string
  code: string
  coordinates: [number, number]
}

// =============================================================================
// Component Props
// =============================================================================

export interface HomeProps {
  /** Hero section content */
  hero: Hero
  /** KPI counters to display */
  kpis: KPI[]
  /** Featured AI models for Toolbox preview */
  featuredModels: FeaturedModel[]
  /** Preview cards for other sections */
  sectionPreviews: SectionPreview[]
  /** Countries for optional map display */
  countries: Country[]
  /** Called when user clicks primary CTA */
  onCtaClick?: (link: string) => void
  /** Called when user clicks a KPI card */
  onKpiClick?: (kpiId: string, link: string) => void
  /** Called when user clicks a featured model */
  onModelClick?: (modelId: string) => void
  /** Called when user clicks a section preview */
  onSectionClick?: (sectionId: string, link: string) => void
  /** Called when user clicks a country on the map */
  onCountryClick?: (countryCode: string) => void
}

// =============================================================================
// Sub-component Props
// =============================================================================

export interface HeroSectionProps {
  hero: Hero
  onCtaClick?: (link: string) => void
}

export interface KPIGridProps {
  kpis: KPI[]
  onKpiClick?: (kpiId: string, link: string) => void
}

export interface ToolboxHighlightProps {
  featuredModels: FeaturedModel[]
  onModelClick?: (modelId: string) => void
  onViewAllClick?: () => void
}

export interface SectionPreviewsProps {
  previews: SectionPreview[]
  onSectionClick?: (sectionId: string, link: string) => void
}

export interface CountryMapProps {
  countries: Country[]
  onCountryClick?: (countryCode: string) => void
}
