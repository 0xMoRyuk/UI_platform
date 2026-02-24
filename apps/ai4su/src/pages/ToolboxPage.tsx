'use client'

import { Toolbox } from '@/sections/toolbox/components'
import type { ToolboxProps } from '@/../product/sections/toolbox/types'
import toolboxDataRaw from '@/../product/sections/toolbox/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const toolboxData = toolboxDataRaw as unknown as Omit<ToolboxProps, 'onSearch' | 'onFilterChange' | 'onModelClick' | 'onGitHubClick' | 'onStudyDownload' | 'onBestPracticesDownload' | 'onFinalReportDownload'>

export function ToolboxPage() {
  const handleSearch = (query: string) => {
    console.log('[Toolbox] Search:', query)
    // Search is handled internally by Toolbox component
  }

  const handleFilterChange = (filters: { sectors: string[]; countries: string[] }) => {
    console.log('[Toolbox] Filter changed:', filters)
    // Filtering is handled internally by Toolbox component
  }

  const handleModelClick = (modelId: string) => {
    console.log('[Toolbox] Model clicked:', modelId)
    // Modal is handled internally by Toolbox component
  }

  const handleGitHubClick = (modelId: string, url: string) => {
    console.log('[Toolbox] GitHub clicked for model:', modelId)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleStudyDownload = (studyId: string) => {
    console.log('[Toolbox] Study download:', studyId)
    const study = toolboxData.studies.find(s => s.id === studyId)
    if (study) {
      window.open(study.pdfUrl, '_blank')
    }
  }

  const handleBestPracticesDownload = (bpId: string) => {
    console.log('[Toolbox] Best practices download:', bpId)
    const bp = toolboxData.bestPractices.find(b => b.id === bpId)
    if (bp) {
      window.open(bp.pdfUrl, '_blank')
    }
  }

  const handleFinalReportDownload = () => {
    console.log('[Toolbox] Final report download')
    window.open(toolboxData.finalReport.pdfUrl, '_blank')
  }

  return (
    <Toolbox
      kpiSummary={toolboxData.kpiSummary}
      filterOptions={toolboxData.filterOptions}
      aiModels={toolboxData.aiModels}
      studies={toolboxData.studies}
      bestPractices={toolboxData.bestPractices}
      finalReport={toolboxData.finalReport}
      pageContent={toolboxData.pageContent}
      studiesSection={toolboxData.studiesSection}
      bestPracticesSection={toolboxData.bestPracticesSection}
      finalReportSection={toolboxData.finalReportSection}
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
