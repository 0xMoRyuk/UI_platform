'use client'

import { Users, BookOpen, GraduationCap, Heart, ChevronDown } from 'lucide-react'
import type { ActivityFilterProps, ActivityTypeId } from '../types'

const iconMap = {
  users: Users,
  book: BookOpen,
  'graduation-cap': GraduationCap,
  heart: Heart,
}

export function ActivityFilter({
  activityTypes,
  selectedType,
  selectedCountry,
  countries,
  onTypeChange,
  onCountryChange,
}: ActivityFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      {/* Type tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTypeChange(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${selectedType === null
              ? 'bg-[#003399] text-white'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
        >
          All
        </button>
        {activityTypes.map((type) => {
          const Icon = iconMap[type.icon]
          const isSelected = selectedType === type.id
          return (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${isSelected
                  ? 'text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              style={isSelected ? { backgroundColor: type.color } : undefined}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{type.label}</span>
            </button>
          )
        })}
      </div>

      {/* Country filter */}
      <div className="relative sm:ml-auto">
        <select
          value={selectedCountry || ''}
          onChange={(e) => onCountryChange(e.target.value as any || null)}
          className="appearance-none bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700
                     rounded-lg px-4 py-2 pr-10 text-sm font-medium text-stone-700 dark:text-stone-300
                     focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent
                     cursor-pointer hover:border-[#003399] transition-colors"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.activityCount})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
      </div>
    </div>
  )
}
