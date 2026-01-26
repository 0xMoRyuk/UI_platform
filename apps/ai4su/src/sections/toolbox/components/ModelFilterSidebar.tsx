'use client'

import { useState } from 'react'
import { ChevronDown, X, Filter } from 'lucide-react'
import type { ModelFilterSidebarProps, Sector, CountryCode } from '@/../product/sections/toolbox/types'

interface FilterSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-stone-200 dark:border-stone-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left font-semibold text-[#003399] dark:text-white hover:text-[#002266] dark:hover:text-[#9BB1DC] transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="pb-4 space-y-2">{children}</div>}
    </div>
  )
}

interface CheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  color?: string
}

function Checkbox({ id, label, checked, onChange, color }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 py-1.5 cursor-pointer group"
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className={`
          w-5 h-5 rounded border-2 transition-all duration-200
          ${checked
            ? 'bg-[#003399] border-[#003399]'
            : 'border-stone-300 dark:border-stone-600 group-hover:border-[#003399]'
          }
        `}>
          {checked && (
            <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {color && (
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="text-sm text-stone-700 dark:text-stone-300 group-hover:text-[#003399] dark:group-hover:text-white transition-colors">
          {label}
        </span>
      </div>
    </label>
  )
}

export function ModelFilterSidebar({
  filterOptions,
  selectedSectors,
  selectedCountries,
  onSectorChange,
  onCountryChange,
  onClearFilters,
}: ModelFilterSidebarProps) {
  const [sectorsOpen, setSectorsOpen] = useState(true)
  const [countriesOpen, setCountriesOpen] = useState(true)

  const hasActiveFilters = selectedSectors.length > 0 || selectedCountries.length > 0

  const handleSectorToggle = (sectorId: Sector, checked: boolean) => {
    if (checked) {
      onSectorChange([...selectedSectors, sectorId])
    } else {
      onSectorChange(selectedSectors.filter((s) => s !== sectorId))
    }
  }

  const handleCountryToggle = (countryCode: CountryCode, checked: boolean) => {
    if (checked) {
      onCountryChange([...selectedCountries, countryCode])
    } else {
      onCountryChange(selectedCountries.filter((c) => c !== countryCode))
    }
  }

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200 dark:border-stone-700">
          <div className="flex items-center gap-2 text-[#003399] dark:text-white font-semibold">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-stone-500 hover:text-[#003399] dark:hover:text-[#F5CE2A] transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>

        {/* Sectors */}
        <FilterSection
          title="Sector"
          isOpen={sectorsOpen}
          onToggle={() => setSectorsOpen(!sectorsOpen)}
        >
          {filterOptions.sectors.map((sector) => (
            <Checkbox
              key={sector.id}
              id={`sector-${sector.id}`}
              label={sector.label}
              checked={selectedSectors.includes(sector.id)}
              onChange={(checked) => handleSectorToggle(sector.id, checked)}
              color={sector.color}
            />
          ))}
        </FilterSection>

        {/* Countries */}
        <FilterSection
          title="Country"
          isOpen={countriesOpen}
          onToggle={() => setCountriesOpen(!countriesOpen)}
        >
          {filterOptions.countries.map((country) => (
            <Checkbox
              key={country.code}
              id={`country-${country.code}`}
              label={country.name}
              checked={selectedCountries.includes(country.code)}
              onChange={(checked) => handleCountryToggle(country.code, checked)}
            />
          ))}
        </FilterSection>

        {/* Active filters count */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {selectedSectors.length + selectedCountries.length} filter{selectedSectors.length + selectedCountries.length !== 1 ? 's' : ''} applied
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
