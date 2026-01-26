'use client'

import { Toolbox } from './components'
import type { ToolboxProps } from '@/../product/sections/toolbox/types'
import toolboxDataRaw from '@/../product/sections/toolbox/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const toolboxData = toolboxDataRaw as unknown as Omit<ToolboxProps, 'onSearch' | 'onFilterChange' | 'onModelClick' | 'onGitHubClick' | 'onStudyDownload' | 'onBestPracticesDownload' | 'onFinalReportDownload'>

export function ToolboxPreview() {
  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const handleFilterChange = (filters: { sectors: string[]; countries: string[] }) => {
    console.log('Filters changed:', filters)
  }

  const handleModelClick = (modelId: string) => {
    console.log('Model clicked:', modelId)
  }

  const handleGitHubClick = (modelId: string, url: string) => {
    console.log('GitHub clicked:', modelId, url)
  }

  const handleStudyDownload = (studyId: string, url: string) => {
    console.log('Study download:', studyId)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleBestPracticesDownload = (bpId: string, url: string) => {
    console.log('Best practices download:', bpId)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleFinalReportDownload = (url: string) => {
    console.log('Final report download')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Toolbox
      kpiSummary={toolboxData.kpiSummary}
      filterOptions={toolboxData.filterOptions}
      aiModels={toolboxData.aiModels}
      studies={toolboxData.studies}
      bestPractices={toolboxData.bestPractices}
      finalReport={toolboxData.finalReport}
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
