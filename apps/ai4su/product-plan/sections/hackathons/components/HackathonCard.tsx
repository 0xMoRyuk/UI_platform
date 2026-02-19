import { Calendar, Users, Brain, ArrowRight } from 'lucide-react'
import type { HackathonCardProps } from '../types'

const countryFlags: Record<string, string> = {
  KE: '🇰🇪',
  NG: '🇳🇬',
  GH: '🇬🇭',
  SN: '🇸🇳',
  RW: '🇷🇼',
  ZA: '🇿🇦',
  EG: '🇪🇬',
  MA: '🇲🇦',
}

export function HackathonCard({ hackathon, onClick }: HackathonCardProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const month = startDate.toLocaleDateString('en-US', { month: 'short' })
    const year = startDate.getFullYear()
    return `${month} ${startDate.getDate()}-${endDate.getDate()}, ${year}`
  }

  return (
    <button
      onClick={onClick}
      className="group relative bg-white dark:bg-stone-900 rounded-2xl overflow-hidden text-left
                 border border-stone-200 dark:border-stone-800
                 hover:border-[#003399] dark:hover:border-[#9BB1DC]
                 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Hero image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-[#003399] to-[#001133] overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#F5CE2A] transform translate-x-8 -translate-y-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[#9BB1DC] transform -translate-x-6 translate-y-6" />
        </div>

        {/* Country flag badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-stone-900/90 rounded-full flex items-center gap-2">
          <span className="text-lg">{countryFlags[hackathon.location.countryCode]}</span>
          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
            {hackathon.location.city}
          </span>
        </div>

        {/* Models badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#F5CE2A] rounded-full flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-[#003399]" />
          <span className="text-xs font-bold text-[#003399]">
            {hackathon.modelsProduced} models
          </span>
        </div>

        {/* Theme badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {hackathon.theme}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#003399] dark:text-white font-[Barlow] mb-2 group-hover:text-[#F5CE2A] transition-colors">
          {hackathon.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
          {hackathon.tagline}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDateRange(hackathon.startDate, hackathon.endDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>{hackathon.participantCount} participants</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium text-[#003399] dark:text-[#9BB1DC] group-hover:text-[#F5CE2A] transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  )
}
