import { Globe, Users, BookOpen, Calendar } from 'lucide-react'

interface EcosystemHeroProps {
  totalActivities: number
  totalParticipants: number
  countriesCount: number
}

export function EcosystemHero({ totalActivities, totalParticipants, countriesCount }: EcosystemHeroProps) {
  const stats = [
    { icon: Calendar, value: totalActivities, label: 'Activities' },
    { icon: Users, value: `${totalParticipants}+`, label: 'Participants' },
    { icon: Globe, value: countriesCount, label: 'Countries' },
    { icon: BookOpen, value: '4', label: 'Research Studies' },
  ]

  return (
    <section className="bg-gradient-to-br from-[#003399] via-[#002266] to-[#001133] text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-[#9BB1DC]/20 flex items-center justify-center">
            <Globe className="w-7 h-7 text-[#9BB1DC]" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold font-[Barlow]">
              Ecosystem
            </h1>
            <p className="text-white/70 text-lg">
              Building Africa's AI community
            </p>
          </div>
        </div>

        <p className="text-xl text-white/80 max-w-3xl mb-10">
          Beyond hackathons, we're fostering a vibrant ecosystem through networking events,
          research initiatives, training workshops, and dedicated support for women founders.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
            >
              <stat.icon className="w-6 h-6 text-[#F5CE2A] mx-auto mb-2" />
              <div className="text-3xl font-bold font-[Barlow] text-white">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
