// =============================================================================
// Data Types
// =============================================================================

export type CountryCode = 'KE' | 'NG' | 'GH' | 'SN' | 'RW' | 'ZA' | 'EG' | 'MA'

export interface MethodologyStep {
  id: string
  title: string
  description: string
  icon: 'lightbulb' | 'users' | 'code' | 'presentation'
}

export interface HackathonLocation {
  venue: string
  city: string
  country: string
  countryCode: CountryCode
}

export interface ChallengeBrief {
  title: string
  summary: string
  pdfUrl: string
}

export interface WinningTeam {
  rank: 1 | 2 | 3
  teamName: string
  projectName: string
  description: string
  modelId?: string
  prize: string
}

export interface HackathonPhoto {
  id: string
  url: string
  caption: string
  featured?: boolean
}

export interface Hackathon {
  id: string
  slug: string
  name: string
  tagline: string
  theme: string
  description: string
  startDate: string
  endDate: string
  location: HackathonLocation
  participantCount: number
  teamCount: number
  modelsProduced: number
  modelIds: string[]
  heroImage: string
  challengeBrief: ChallengeBrief
  bestPracticesId: string | null
  partners: string[]
  winningTeams: WinningTeam[]
  outcomes: string[]
  photos: HackathonPhoto[]
}

// =============================================================================
// Content Types
// =============================================================================

export interface HackathonPageContent {
  title: string
  subtitleTemplate: string
  descriptionTemplate: string
  allHackathonsTitle: string
  statsLabels: string[]
  countriesValue: string
  emptyState: {
    title: string
    ctaText: string
  }
  filterResultTemplate: string
}

export interface MethodologyContent {
  title: string
  description: string
}

export interface HackathonFieldLabels {
  date: string
  location: string
  venue: string
  participants: string
  modelsProduced: string
  partners: string
  participantTemplate: string
  modelsTemplate: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface HackathonsPageProps {
  /** Methodology steps explaining hackathon format */
  methodology: MethodologyStep[]
  /** All hackathon events */
  hackathons: Hackathon[]
  /** Page-level text content */
  pageContent: HackathonPageContent
  /** Methodology section text content */
  methodologyContent: MethodologyContent
  /** Called when user clicks a hackathon card */
  onHackathonClick?: (hackathonSlug: string) => void
  /** Called when user filters by country */
  onCountryFilter?: (countryCode: CountryCode | null) => void
}

export interface HackathonDetailPageProps {
  /** The hackathon to display */
  hackathon: Hackathon
  /** Field labels for the hero sidebar */
  fieldLabels: HackathonFieldLabels
  /** Called when user clicks back to all hackathons */
  onBackClick?: () => void
  /** Called when user downloads challenge brief */
  onChallengeBriefDownload?: (url: string) => void
  /** Called when user downloads best practices */
  onBestPracticesDownload?: (bpId: string) => void
  /** Called when user clicks an AI model link */
  onModelClick?: (modelId: string) => void
  /** Called when user opens photo in lightbox */
  onPhotoClick?: (photoId: string) => void
  /** Called when user shares on social media */
  onShare?: (platform: 'twitter' | 'linkedin') => void
}

// =============================================================================
// Sub-component Props
// =============================================================================

export interface MethodologySectionProps {
  steps: MethodologyStep[]
  content: MethodologyContent
}

export interface HackathonCardProps {
  hackathon: Hackathon
  onClick: () => void
}

export interface HackathonGridProps {
  hackathons: Hackathon[]
  onHackathonClick: (slug: string) => void
}

export interface CountryFilterProps {
  selectedCountry: CountryCode | null
  onCountryChange: (country: CountryCode | null) => void
}

export interface HackathonHeroProps {
  hackathon: Hackathon
  fieldLabels: HackathonFieldLabels
}

export interface ChallengeBriefSectionProps {
  challengeBrief: ChallengeBrief
  onDownload: (url: string) => void
}

export interface WinningTeamsSectionProps {
  teams: WinningTeam[]
  onModelClick?: (modelId: string) => void
}

export interface OutcomesSectionProps {
  outcomes: string[]
}

export interface PhotoGalleryProps {
  photos: HackathonPhoto[]
  onPhotoClick: (photoId: string) => void
}

export interface LightboxProps {
  photos: HackathonPhoto[]
  currentPhotoId: string | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export interface BreadcrumbProps {
  hackathonName: string
  onBackClick: () => void
}

export interface ShareButtonsProps {
  hackathon: Hackathon
  onShare: (platform: 'twitter' | 'linkedin') => void
}
