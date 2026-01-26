import { HackathonCard } from './HackathonCard'
import type { HackathonGridProps } from '@/../product/sections/hackathons/types'

export function HackathonGrid({ hackathons, onHackathonClick }: HackathonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {hackathons.map((hackathon) => (
        <HackathonCard
          key={hackathon.id}
          hackathon={hackathon}
          onClick={() => onHackathonClick(hackathon.slug)}
        />
      ))}
    </div>
  )
}
