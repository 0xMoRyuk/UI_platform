// =============================================================================
// Core Types
// =============================================================================

export interface DateRange {
  start: string  // ISO date string
  end: string    // ISO date string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Location {
  city: string
  country: string
  countryCode: string
  venue?: string
}

export interface LocationWithCoords extends Location {
  coordinates: Coordinates
}

export interface Photo {
  id: string
  url: string
  caption?: string
  alt: string
}

export interface Resource {
  id: string
  type: 'pdf' | 'link' | 'video'
  title: string
  url: string
}

// =============================================================================
// Domain Entities
// =============================================================================

export interface AIModel {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
  sector: 'agriculture' | 'healthcare' | 'fintech' | 'education' | 'environment' | 'logistics'
  country: string
  githubUrl: string
  useCase: string
  requirements: string
  hackathonId?: string
}

export interface WinningTeam {
  id: string
  name: string
  members: string[]
  project: string
  description: string
  prize?: string
}

export interface Hackathon {
  id: string
  name: string
  slug: string
  dates: DateRange
  location: Location
  theme: string
  challenge: string
  participantCount: number
  heroImage: string
  challengeBriefPdf: string
  bestPracticesPdf: string
  winningTeams: WinningTeam[]
  photos: Photo[]
  modelIds: string[]
}

export interface EcosystemActivity {
  id: string
  title: string
  type: 'event' | 'research' | 'workshop' | 'women-founders'
  dates: DateRange
  location: LocationWithCoords
  shortDescription: string
  fullDescription: string
  photos: Photo[]
  resources: Resource[]
}

export interface Study {
  id: string
  title: string
  description: string
  partnerId: string
  pdfUrl: string
  thumbnailUrl: string
  keyFindings: string[]
}

export interface Partner {
  id: string
  name: string
  role: string
  tier: 1 | 2 | 3
  logoUrl: string
  websiteUrl: string
  description: string
  contributions: string[]
  isLead: boolean
}

export interface Country {
  id: string
  name: string
  flagUrl: string
  coordinates: Coordinates
}

// =============================================================================
// Page Data Types
// =============================================================================

export interface HomePageData {
  hero: {
    title: string
    subtitle: string
    ctaText: string
    ctaHref: string
  }
  kpis: Array<{
    id: string
    label: string
    value: number
    suffix?: string
    icon: string
    section: string
  }>
  toolboxHighlight: {
    title: string
    description: string
    featuredModels: AIModel[]
    ctaText: string
  }
  sectionPreviews: Array<{
    id: string
    title: string
    description: string
    image: string
    href: string
  }>
}

export interface ToolboxPageData {
  kpis: Array<{
    label: string
    value: number
  }>
  models: AIModel[]
  studies: Study[]
  bestPractices: Array<{
    id: string
    hackathonId: string
    hackathonName: string
    pdfUrl: string
  }>
  finalReport: {
    title: string
    description: string
    pdfUrl: string
  }
}

export interface HackathonsPageData {
  methodology: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
  hackathons: Hackathon[]
}

export interface EcosystemPageData {
  intro: {
    title: string
    description: string
  }
  activities: EcosystemActivity[]
  womenFounders: {
    title: string
    description: string
    stats: Array<{ label: string; value: string }>
  }
  testimonials: Array<{
    id: string
    name: string
    role: string
    quote: string
    photo: string
  }>
}

export interface PartnersPageData {
  intro: {
    title: string
    subtitle: string
    description: string
  }
  funders: {
    euAttribution: {
      text: string
      flagUrl: string
      disclaimer: string
    }
    teamEurope: {
      title: string
      members: Array<{
        id: string
        name: string
        logoUrl: string
        websiteUrl: string
        isPrimary: boolean
      }>
    }
    hashtags: string[]
  }
  implementingPartners: Partner[]
  serviceProviders: Partner[]
  datagovInitiative: {
    title: string
    description: string
    websiteUrl: string
    ctaText: string
    highlights: string[]
  }
  socialLinks: {
    hashtags: string[]
    twitter: string
    linkedin: string
  }
}
