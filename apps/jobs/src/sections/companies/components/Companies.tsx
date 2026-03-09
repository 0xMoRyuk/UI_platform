import { useState, useMemo } from 'react'
import type { Company, CompaniesPageContent } from '@/../product/sections/companies/types'
import { SearchBar } from '@/sections/jobs/components/SearchBar'
import { CompanyCard } from './CompanyCard'

interface CompaniesProps {
  companies: Company[]
  pageContent: CompaniesPageContent
  onCompanyClick?: (companyId: string) => void
}

export function Companies({ companies, pageContent, onCompanyClick }: CompaniesProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return companies
    const q = query.toLowerCase()
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q),
    )
  }, [companies, query])

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{pageContent.title}</h1>
          <p className="text-muted-foreground">{pageContent.subtitle}</p>
        </div>

        <div className="mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={pageContent.searchPlaceholder}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={() => onCompanyClick?.(company.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No companies match your search.</p>
          </div>
        )}
      </div>
    </section>
  )
}
