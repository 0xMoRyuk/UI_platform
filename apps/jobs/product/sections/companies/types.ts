export interface Company {
  id: string
  name: string
  tagline: string
  description: string
  sector: string
  location: string
  size: string
  founded: string
  website: string
  openPositions: number
}

export interface CompaniesPageContent {
  title: string
  subtitle: string
  searchPlaceholder: string
}

export interface CompaniesData {
  pageContent: CompaniesPageContent
  companies: Company[]
}

export interface CompanyCardProps {
  company: Company
  onClick?: () => void
}
