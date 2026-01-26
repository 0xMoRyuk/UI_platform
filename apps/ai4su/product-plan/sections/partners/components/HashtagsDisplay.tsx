import { Hash } from 'lucide-react'
import type { HashtagsDisplayProps } from '../types'

export function HashtagsDisplay({ hashtags }: HashtagsDisplayProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-6">
      {hashtags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#003399]/10 dark:bg-[#003399]/20 rounded-full text-sm font-medium text-[#003399] dark:text-[#9BB1DC]"
        >
          <Hash className="w-3 h-3" />
          {tag.replace('#', '')}
        </span>
      ))}
    </div>
  )
}
