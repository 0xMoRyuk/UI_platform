import { Calendar, MapPin, Users, Brain, Building2 } from 'lucide-react'
import type { HackathonHeroProps } from '@/../product/sections/hackathons/types'

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

export function HackathonHero({ hackathon }: HackathonHeroProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
    const startStr = startDate.toLocaleDateString('en-US', options)
    const endStr = endDate.toLocaleDateString('en-US', { day: 'numeric' })
    const year = startDate.getFullYear()
    return `${startStr}-${endStr}, ${year}`
  }

  return (
    <section className="relative bg-gradient-to-br from-[#003399] via-[#002266] to-[#001133] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F5CE2A]/10 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#9BB1DC]/20 blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Theme badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <span className="text-xl">{countryFlags[hackathon.location.countryCode]}</span>
              <span>{hackathon.theme}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold font-[Barlow] mb-4">
              {hackathon.name}
            </h1>

            {/* Tagline */}
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              {hackathon.tagline}
            </p>

            {/* Description */}
            <p className="text-white/70 leading-relaxed max-w-2xl">
              {hackathon.description}
            </p>
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4">
              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5CE2A]/20 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#F5CE2A]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Date</p>
                  <p className="font-medium">{formatDateRange(hackathon.startDate, hackathon.endDate)}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5CE2A]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#F5CE2A]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Location</p>
                  <p className="font-medium">{hackathon.location.city}, {hackathon.location.country}</p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5CE2A]/20 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-[#F5CE2A]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Venue</p>
                  <p className="font-medium">{hackathon.location.venue}</p>
                </div>
              </div>

              {/* Participants */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5CE2A]/20 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#F5CE2A]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Participants</p>
                  <p className="font-medium">{hackathon.participantCount} people, {hackathon.teamCount} teams</p>
                </div>
              </div>

              {/* Models */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5CE2A]/20 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-[#F5CE2A]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">AI Models Produced</p>
                  <p className="font-medium">{hackathon.modelsProduced} open-source models</p>
                </div>
              </div>

              {/* Partners */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-2">Partners</p>
                <div className="flex flex-wrap gap-2">
                  {hackathon.partners.map((partner) => (
                    <span key={partner} className="px-2 py-1 bg-white/10 rounded text-xs">
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
