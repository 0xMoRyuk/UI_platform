// =============================================================================
// Data Types
// =============================================================================

export type ActivityTypeId = 'event' | 'research' | 'workshop' | 'women-founders'

export type CountryCode = 'KE' | 'NG' | 'GH' | 'SN' | 'RW' | 'ZA' | 'EG' | 'MA' | 'ET'

export interface ActivityType {
  id: ActivityTypeId
  label: string
  color: string
  icon: 'users' | 'book' | 'graduation-cap' | 'heart'
}

export interface ActivityLocation {
  venue: string
  city: string
  country: string
  countryCode: CountryCode
  coordinates: [number, number]
}

export interface ActivityPhoto {
  id: string
  url: string
  caption: string
}

export interface ActivityResource {
  title: string
  type: 'pdf' | 'video' | 'link'
  url: string
}

export interface Activity {
  id: string
  title: string
  type: ActivityTypeId
  description: string
  fullDescription: string
  startDate: string
  endDate: string
  location: ActivityLocation
  participantCount: number
  highlights: string[]
  photos: ActivityPhoto[]
  resources: ActivityResource[]
  studyId?: string
}

export interface WomenFoundersStat {
  value: number
  label: string
  suffix: string
}

export interface ProgramElement {
  title: string
  description: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  country: string
  countryCode: CountryCode
  photoUrl: string
}

export interface WomenFoundersProgram {
  title: string
  tagline: string
  description: string
  stats: WomenFoundersStat[]
  programElements: ProgramElement[]
  testimonials: Testimonial[]
  ctaText: string
  ctaLink: string
  badge: string
  testimonialHeading: string
  expandLabel: string
  expandHeading: string
  programDescription: string[]
}

export interface CountryMapData {
  code: CountryCode
  name: string
  coordinates: [number, number]
  activityCount: number
}

export interface EcosystemPageContent {
  title: string
  subtitle: string
  description: string
  statsLabels: string[]
  researchStudiesValue: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface EcosystemPageProps {
  /** Activity type options for filtering */
  activityTypes: ActivityType[]
  /** All ecosystem activities */
  activities: Activity[]
  /** Women Founders program details */
  womenFounders: WomenFoundersProgram
  /** Countries with coordinates for map */
  countries: CountryMapData[]
  /** Page-level text content */
  pageContent: EcosystemPageContent
  /** Called when user filters by activity type */
  onTypeFilter?: (type: ActivityTypeId | null) => void
  /** Called when user filters by country */
  onCountryFilter?: (countryCode: CountryCode | null) => void
  /** Called when user clicks activity card */
  onActivityClick?: (activityId: string) => void
  /** Called when user clicks map marker */
  onMapMarkerClick?: (activityId: string) => void
  /** Called when user downloads a resource */
  onResourceDownload?: (activityId: string, resourceUrl: string) => void
  /** Called when user clicks Women Founders CTA */
  onWomenFoundersCta?: () => void
}

// =============================================================================
// Sub-component Props
// =============================================================================

export interface ActivityMapProps {
  activities: Activity[]
  activityTypes: ActivityType[]
  selectedActivityId: string | null
  onMarkerClick: (activityId: string) => void
  onMarkerHover?: (activityId: string | null) => void
}

export interface ActivityListProps {
  activities: Activity[]
  activityTypes: ActivityType[]
  highlightedActivityId: string | null
  onActivityClick: (activityId: string) => void
}

export interface ActivityFilterProps {
  activityTypes: ActivityType[]
  selectedType: ActivityTypeId | null
  selectedCountry: CountryCode | null
  countries: CountryMapData[]
  onTypeChange: (type: ActivityTypeId | null) => void
  onCountryChange: (countryCode: CountryCode | null) => void
}

export interface ActivityCardProps {
  activity: Activity
  activityType: ActivityType
  isHighlighted: boolean
  isExpanded: boolean
  onClick: () => void
  onResourceDownload?: (url: string) => void
}

export interface WomenFoundersSectionProps {
  program: WomenFoundersProgram
  onCtaClick: () => void
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

export interface StatCardProps {
  stat: WomenFoundersStat
}

export interface MapMarkerPopupProps {
  activity: Activity
  onViewDetails: () => void
}

export interface MobileMapToggleProps {
  isMapVisible: boolean
  onToggle: () => void
}

export interface ActivityGalleryProps {
  photos: ActivityPhoto[]
  onPhotoClick: (photoId: string) => void
}
