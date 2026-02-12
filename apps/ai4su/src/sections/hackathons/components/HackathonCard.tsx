import { Calendar, Users, Brain, ArrowRight } from 'lucide-react'
import { Badge } from '@ui-platform/ui/components/badge'
import type { HackathonCardProps } from '@/../product/sections/hackathons/types'

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
                 hover:border-brand-primary dark:hover:border-brand-secondary
                 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Hero image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-brand-primary to-brand-primary-darker overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-accent transform translate-x-8 -translate-y-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-brand-secondary transform -translate-x-6 translate-y-6" />
        </div>

        {/* Country flag badge */}
        <Badge variant="secondary" className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-stone-900/90 gap-2">
          <span className="text-lg">{countryFlags[hackathon.location.countryCode]}</span>
          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
            {hackathon.location.city}
          </span>
        </Badge>

        {/* Models badge */}
        <Badge className="absolute top-4 right-4 px-3 py-1.5 bg-brand-accent text-brand-accent-foreground gap-1.5">
          <Brain className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">
            {hackathon.modelsProduced} models
          </span>
        </Badge>

        {/* Theme badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <Badge variant="outline" className="bg-white/20 backdrop-blur-sm border-white/20 text-white">
            {hackathon.theme}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-2 group-hover:text-brand-accent transition-colors">
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
        <div className="flex items-center gap-2 text-sm font-medium text-brand-primary dark:text-brand-secondary group-hover:text-brand-accent transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  )
}
