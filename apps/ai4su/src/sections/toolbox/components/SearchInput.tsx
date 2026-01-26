import { Search, X } from 'lucide-react'
import type { SearchInputProps } from '@/../product/sections/toolbox/types'

export function SearchInput({ value, onChange, placeholder = 'Search AI models...' }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3 rounded-xl border border-stone-200 dark:border-stone-700
                   bg-white dark:bg-stone-900 text-stone-900 dark:text-white
                   placeholder:text-stone-400 dark:placeholder:text-stone-500
                   focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent
                   transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
