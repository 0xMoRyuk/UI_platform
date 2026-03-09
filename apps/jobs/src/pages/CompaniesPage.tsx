'use client'

import { Companies } from '@/sections/companies/components'
import type { CompaniesData } from '@/../product/sections/companies/types'
import companiesDataRaw from '@/../product/sections/companies/data.json'

const companiesData = companiesDataRaw as unknown as CompaniesData

export function CompaniesPage() {
  return (
    <Companies
      companies={companiesData.companies}
      pageContent={companiesData.pageContent}
    />
  )
}
