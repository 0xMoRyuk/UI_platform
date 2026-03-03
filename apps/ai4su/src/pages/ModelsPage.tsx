'use client'

import { useNavigate } from 'react-router-dom'
import { Toolbox } from '@/sections/toolbox/components'
import type { KPISummaryItem } from '@/../product/sections/toolbox/types'
import { getAllModels, getAvailableFilters, getAllStudies, getAllBestPractices, getFinalReport, getStudyById, getBestPracticeById } from '@/lib/data-provider'
import toolboxDataRaw from '@/../product/sections/toolbox/data.json'

// Domain data from data-provider
const aiModels = getAllModels()
const filterOptions = getAvailableFilters()
const studies = getAllStudies()
const bestPractices = getAllBestPractices()
const finalReport = getFinalReport()

// Presentation content stays as direct JSON (not domain entities)
const uiContent = toolboxDataRaw as unknown as {
  kpiSummary: KPISummaryItem[]
  pageContent: { title: string; subtitle: string; searchPlaceholder: string; emptyState: { title: string; description: string }; resultsTemplate: string }
  studiesSection: { title: string; description: string; keyFindingsLabel: string; downloadLabel: string }
  bestPracticesSection: { title: string; description: string; downloadLabel: string }
  finalReportSection: { badge: string; downloadText: string; fundedByBadge: string; pagesLabel: string }
}

export function ModelsPage() {
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    console.log('[Models] Search:', query)
  }

  const handleFilterChange = (filters: { sectors: string[]; countries: string[] }) => {
    console.log('[Models] Filter changed:', filters)
  }

  const handleModelClick = (modelId: string) => {
    navigate(`/models/${modelId}`)
  }

  const handleGitHubClick = (modelId: string, url: string) => {
    console.log('[Models] GitHub clicked for model:', modelId)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleStudyDownload = (studyId: string) => {
    console.log('[Models] Study download:', studyId)
    const study = getStudyById(studyId)
    if (study) {
      window.open(study.pdfUrl, '_blank')
    }
  }

  const handleBestPracticesDownload = (bpId: string) => {
    console.log('[Models] Best practices download:', bpId)
    const bp = getBestPracticeById(bpId)
    if (bp) {
      window.open(bp.pdfUrl, '_blank')
    }
  }

  const handleFinalReportDownload = () => {
    console.log('[Models] Final report download')
    window.open(finalReport.pdfUrl, '_blank')
  }

  return (
    <Toolbox
      kpiSummary={uiContent.kpiSummary}
      filterOptions={filterOptions}
      aiModels={aiModels}
      studies={studies}
      bestPractices={bestPractices}
      finalReport={finalReport}
      pageContent={uiContent.pageContent}
      studiesSection={uiContent.studiesSection}
      bestPracticesSection={uiContent.bestPracticesSection}
      finalReportSection={uiContent.finalReportSection}
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
      onModelClick={handleModelClick}
      onGitHubClick={handleGitHubClick}
      onStudyDownload={handleStudyDownload}
      onBestPracticesDownload={handleBestPracticesDownload}
      onFinalReportDownload={handleFinalReportDownload}
    />
  )
}
