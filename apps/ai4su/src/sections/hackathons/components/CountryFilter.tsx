'use client'

import { ChevronDown } from 'lucide-react'
import type { CountryFilterProps, CountryCode } from '@/../product/sections/hackathons/types'

const countries: { code: CountryCode; name: string; flag: string }[] = [
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
]

export function CountryFilter({ selectedCountry, onCountryChange }: CountryFilterProps) {
  return (
    <div className="relative inline-block">
      <select
        value={selectedCountry || ''}
        onChange={(e) => onCountryChange(e.target.value as CountryCode || null)}
        className="appearance-none bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700
                   rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-stone-700 dark:text-stone-300
                   focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent
                   cursor-pointer hover:border-[#003399] transition-colors"
      >
        <option value="">All Countries</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
    </div>
  )
}
