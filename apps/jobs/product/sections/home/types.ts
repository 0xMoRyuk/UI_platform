export interface HeroData {
  badge: string
  title: string
  heading: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  stats: Array<{ value: string; label: string }>
}

export interface StatItem {
  id: string
  value: string
  label: string
  link: string
}

export interface SectionPreview {
  id: string
  title: string
  description: string
  link: string
  ctaText: string
  icon: string
}

export interface HomeData {
  hero: HeroData
  stats: StatItem[]
  sectionPreviews: SectionPreview[]
}

export interface HomeProps {
  hero: HeroData
  stats: StatItem[]
  sectionPreviews: SectionPreview[]
  featuredJobIds?: string[]
  onCtaClick?: (link: string) => void
  onStatClick?: (statId: string, link: string) => void
  onSectionClick?: (sectionId: string, link: string) => void
  onJobClick?: (jobSlug: string) => void
}

export interface HeroSectionProps {
  hero: HeroData
  onCtaClick?: (link: string) => void
}

export interface SectionPreviewsProps {
  previews: SectionPreview[]
  onSectionClick?: (sectionId: string, link: string) => void
}
