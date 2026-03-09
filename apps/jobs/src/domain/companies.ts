import type { Company } from './types'
import companiesDataRaw from '@/../product/sections/companies/data.json'

const allCompanies = (companiesDataRaw as unknown as { companies: Company[] }).companies

export function getCompanies(q?: string): Company[] {
  if (!q) return allCompanies

  const query = q.toLowerCase()
  return allCompanies.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.tagline.toLowerCase().includes(query) ||
      c.sector.toLowerCase().includes(query) ||
      c.location.toLowerCase().includes(query),
  )
}

export function getCompanyById(id: string): Company | undefined {
  return allCompanies.find((c) => c.id === id)
}
