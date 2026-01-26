import { Trophy, Medal, Award, ExternalLink } from 'lucide-react'
import type { WinningTeamsSectionProps, WinningTeam } from '@/../product/sections/hackathons/types'

const rankConfig = {
  1: {
    icon: Trophy,
    bg: 'bg-gradient-to-br from-[#F5CE2A] to-[#FFB800]',
    text: 'text-[#003399]',
    border: 'border-[#F5CE2A]',
    label: '1st Place',
  },
  2: {
    icon: Medal,
    bg: 'bg-gradient-to-br from-stone-300 to-stone-400',
    text: 'text-stone-800',
    border: 'border-stone-300',
    label: '2nd Place',
  },
  3: {
    icon: Award,
    bg: 'bg-gradient-to-br from-amber-600 to-amber-700',
    text: 'text-white',
    border: 'border-amber-600',
    label: '3rd Place',
  },
}

interface TeamCardProps {
  team: WinningTeam
  onModelClick?: (modelId: string) => void
}

function TeamCard({ team, onModelClick }: TeamCardProps) {
  const config = rankConfig[team.rank]
  const Icon = config.icon

  return (
    <div className={`relative bg-white dark:bg-stone-900 rounded-2xl border-2 ${config.border} overflow-hidden`}>
      {/* Rank badge */}
      <div className={`${config.bg} ${config.text} py-3 px-4 flex items-center gap-3`}>
        <Icon className="w-6 h-6" />
        <span className="font-bold">{config.label}</span>
        <span className="ml-auto text-sm opacity-80">{team.prize}</span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">Team</p>
          <h3 className="text-lg font-bold text-[#003399] dark:text-white font-[Barlow]">
            {team.teamName}
          </h3>
        </div>

        <div className="mb-4">
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">Project</p>
          <h4 className="text-base font-semibold text-stone-800 dark:text-stone-200">
            {team.projectName}
          </h4>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
          {team.description}
        </p>

        {team.modelId && (
          <button
            onClick={() => onModelClick?.(team.modelId!)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#003399] dark:text-[#9BB1DC] hover:text-[#F5CE2A] transition-colors"
          >
            View AI Model
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

export function WinningTeamsSection({ teams, onModelClick }: WinningTeamsSectionProps) {
  // Sort by rank
  const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank)

  return (
    <section className="py-12 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-[#F5CE2A]/20 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-[#F5CE2A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#003399] dark:text-white font-[Barlow]">
          Winning Teams
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedTeams.map((team) => (
          <TeamCard key={team.teamName} team={team} onModelClick={onModelClick} />
        ))}
      </div>
    </section>
  )
}
