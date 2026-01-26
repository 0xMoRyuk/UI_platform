import { ExternalLink, Flag } from 'lucide-react'
import type { TeamEuropeGridProps } from '../types'

export function TeamEuropeGrid({ teamEurope, onMemberClick }: TeamEuropeGridProps) {
  return (
    <div className="mt-8">
      <h4 className="text-lg font-bold text-[#003399] dark:text-white font-[Barlow] mb-2">
        {teamEurope.title}
      </h4>
      <p className="text-stone-600 dark:text-stone-400 mb-6">
        {teamEurope.description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {teamEurope.members.map((member) => (
          <button
            key={member.id}
            onClick={() => onMemberClick?.(member.id, member.websiteUrl)}
            className={`group relative bg-white dark:bg-stone-900 rounded-xl p-4 border-2 transition-all duration-200
              ${member.isPrimary
                ? 'border-[#003399] shadow-md'
                : 'border-stone-200 dark:border-stone-700 hover:border-[#003399]'
              } hover:shadow-lg`}
          >
            {/* Logo placeholder */}
            <div className="w-full h-16 flex items-center justify-center mb-3">
              <div className="w-16 h-12 rounded bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Flag className="w-6 h-6 text-stone-400" />
              </div>
            </div>

            <p className="text-sm font-medium text-[#003399] dark:text-white text-center">
              {member.name}
            </p>

            {member.isPrimary && (
              <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#F5CE2A] rounded text-[10px] font-bold text-[#003399]">
                Primary
              </span>
            )}

            {/* External link indicator */}
            <ExternalLink className="absolute bottom-2 right-2 w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  )
}
