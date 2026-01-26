'use client'

import { useState, useMemo } from 'react'
import { Boxes } from 'lucide-react'
import type { ToolboxProps, Sector, CountryCode, AIModel } from '../types'
import { KPISummaryBar } from './KPISummaryBar'
import { SearchInput } from './SearchInput'
import { ModelFilterSidebar } from './ModelFilterSidebar'
import { ModelGrid } from './ModelGrid'
import { ModelDetailModal } from './ModelDetailModal'
import { EmptyState } from './EmptyState'
import { StudiesSection } from './StudiesSection'
import { BestPracticesSection } from './BestPracticesSection'
import { FinalReportCard } from './FinalReportCard'

export function Toolbox({
  kpiSummary,
  filterOptions,
  aiModels,
  studies,
  bestPractices,
  finalReport,
  onSearch,
  onFilterChange,
  onModelClick,
  onGitHubClick,
  onStudyDownload,
  onBestPracticesDownload,
  onFinalReportDownload,
}: ToolboxProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([])
  const [selectedCountries, setSelectedCountries] = useState<CountryCode[]>([])
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter models based on search and filters
  const filteredModels = useMemo(() => {
    return aiModels.filter((model) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          model.name.toLowerCase().includes(query) ||
          model.shortDescription.toLowerCase().includes(query) ||
          model.sector.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Sector filter
      if (selectedSectors.length > 0 && !selectedSectors.includes(model.sector)) {
        return false
      }

      // Country filter
      if (selectedCountries.length > 0 && !selectedCountries.includes(model.country)) {
        return false
      }

      return true
    })
  }, [aiModels, searchQuery, selectedSectors, selectedCountries])

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleSectorChange = (sectors: Sector[]) => {
    setSelectedSectors(sectors)
    onFilterChange?.({ sectors, countries: selectedCountries })
  }

  const handleCountryChange = (countries: CountryCode[]) => {
    setSelectedCountries(countries)
    onFilterChange?.({ sectors: selectedSectors, countries })
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedSectors([])
    setSelectedCountries([])
    onFilterChange?.({ sectors: [], countries: [] })
  }

  const handleModelClick = (modelId: string) => {
    const model = aiModels.find((m) => m.id === modelId)
    if (model) {
      setSelectedModel(model)
      setIsModalOpen(true)
      onModelClick?.(modelId)
    }
  }

  const handleGitHubClick = (url: string) => {
    if (selectedModel) {
      onGitHubClick?.(selectedModel.id, url)
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedModel(null)
  }

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* KPI Summary Bar */}
      <KPISummaryBar items={kpiSummary} />

      {/* Page Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#003399]/10 dark:bg-[#003399]/20 flex items-center justify-center">
              <Boxes className="w-6 h-6 text-[#003399] dark:text-[#9BB1DC]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#003399] dark:text-white font-[Barlow]">
                AI Model Toolbox
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Open-source AI models built for African contexts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <ModelFilterSidebar
            filterOptions={filterOptions}
            selectedSectors={selectedSectors}
            selectedCountries={selectedCountries}
            onSectorChange={handleSectorChange}
            onCountryChange={handleCountryChange}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search Input */}
            <div className="mb-6">
              <SearchInput
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search models by name, description, or sector..."
              />
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-stone-500 dark:text-stone-400">
              Showing {filteredModels.length} of {aiModels.length} models
            </div>

            {/* Model Grid or Empty State */}
            {filteredModels.length > 0 ? (
              <ModelGrid models={filteredModels} onModelClick={handleModelClick} />
            ) : (
              <EmptyState
                title="No models found"
                description="Try adjusting your search or filters to find what you're looking for."
                onClearFilters={handleClearFilters}
              />
            )}

            {/* Studies Section */}
            <StudiesSection studies={studies} onDownload={onStudyDownload || (() => {})} />

            {/* Best Practices Section */}
            <BestPracticesSection
              bestPractices={bestPractices}
              onDownload={onBestPracticesDownload || (() => {})}
            />

            {/* Final Report */}
            <FinalReportCard
              report={finalReport}
              onDownload={onFinalReportDownload || (() => {})}
            />
          </div>
        </div>
      </div>

      {/* Model Detail Modal */}
      <ModelDetailModal
        model={selectedModel}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onGitHubClick={handleGitHubClick}
      />
    </main>
  )
}
