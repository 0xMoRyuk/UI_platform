// =============================================================================
// Data Types
// =============================================================================

export type Sector = 'agriculture' | 'healthcare' | 'fintech' | 'education' | 'environment' | 'logistics'

export type CountryCode = 'KE' | 'NG' | 'GH' | 'SN' | 'RW' | 'ZA' | 'EG' | 'MA'

export interface KPISummaryItem {
  label: string
  value: number
  icon: 'brain' | 'trophy' | 'globe' | 'book'
}

export interface SectorFilter {
  id: Sector
  label: string
  color: string
}

export interface CountryFilter {
  code: CountryCode
  name: string
}

export interface FilterOptions {
  sectors: SectorFilter[]
  countries: CountryFilter[]
}

export interface AIModel {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
  useCase: string
  technicalRequirements: string
  sector: Sector
  country: CountryCode
  githubUrl: string
  hackathonId?: string
}

export interface Study {
  id: string
  title: string
  description: string
  partner: string
  partnerLogo: string
  pdfUrl: string
  publishedDate: string
  keyFindings: string[]
}

export interface BestPractices {
  id: string
  title: string
  hackathonId: string
  hackathonName: string
  pdfUrl: string
  highlights: string[]
}

export interface FinalReport {
  title: string
  description: string
  pdfUrl: string
  publishedDate: string
  pages: number
}

export interface PageContent {
  title: string
  subtitle: string
  searchPlaceholder: string
  emptyState: {
    title: string
    description: string
  }
  resultsTemplate: string
}

export interface StudiesSectionContent {
  title: string
  description: string
  keyFindingsLabel: string
  downloadLabel: string
}

export interface BestPracticesSectionContent {
  title: string
  description: string
  downloadLabel: string
}

export interface FinalReportSectionContent {
  badge: string
  downloadText: string
  fundedByBadge: string
  pagesLabel: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ToolboxProps {
  /** Compact KPI metrics for top bar */
  kpiSummary: KPISummaryItem[]
  /** Available filter options */
  filterOptions: FilterOptions
  /** All AI models */
  aiModels: AIModel[]
  /** Research studies */
  studies: Study[]
  /** Hackathon best practices reports */
  bestPractices: BestPractices[]
  /** Final program report */
  finalReport: FinalReport
  /** Page-level text content */
  pageContent: PageContent
  /** Studies section text content */
  studiesSection: StudiesSectionContent
  /** Best practices section text content */
  bestPracticesSection: BestPracticesSectionContent
  /** Final report section text content */
  finalReportSection: FinalReportSectionContent
  /** Called when user searches */
  onSearch?: (query: string) => void
  /** Called when user changes filters */
  onFilterChange?: (filters: { sectors: Sector[]; countries: CountryCode[] }) => void
  /** Called when user clicks a model card */
  onModelClick?: (modelId: string) => void
  /** Called when user clicks GitHub link */
  onGitHubClick?: (modelId: string, url: string) => void
  /** Called when user downloads a study */
  onStudyDownload?: (studyId: string, url: string) => void
  /** Called when user downloads best practices */
  onBestPracticesDownload?: (bpId: string, url: string) => void
  /** Called when user downloads final report */
  onFinalReportDownload?: (url: string) => void
}

// =============================================================================
// Sub-component Props
// =============================================================================

export interface KPISummaryBarProps {
  items: KPISummaryItem[]
}

export interface ModelFilterSidebarProps {
  filterOptions: FilterOptions
  selectedSectors: Sector[]
  selectedCountries: CountryCode[]
  onSectorChange: (sectors: Sector[]) => void
  onCountryChange: (countries: CountryCode[]) => void
  onClearFilters: () => void
}

export interface ModelGridProps {
  models: AIModel[]
  onModelClick: (modelId: string) => void
}

export interface ModelCardProps {
  model: AIModel
  onClick: () => void
}

export interface ModelDetailModalProps {
  model: AIModel | null
  isOpen: boolean
  onClose: () => void
  onGitHubClick: (url: string) => void
}

export interface StudySectionProps {
  studies: Study[]
  content: StudiesSectionContent
  onDownload: (studyId: string, url: string) => void
}

export interface BestPracticesSectionProps {
  bestPractices: BestPractices[]
  content: BestPracticesSectionContent
  onDownload: (bpId: string, url: string) => void
}

export interface FinalReportCardProps {
  report: FinalReport
  content: FinalReportSectionContent
  onDownload: (url: string) => void
}

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export interface EmptyStateProps {
  title: string
  description: string
  onClearFilters?: () => void
}
