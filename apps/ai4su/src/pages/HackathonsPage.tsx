'use client'

import { useNavigate } from 'react-router-dom'
import { Hackathons } from '@/sections/hackathons/components'
import type { HackathonsPageProps } from '@/../product/sections/hackathons/types'
import hackathonsDataRaw from '@/../product/sections/hackathons/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const hackathonsData = hackathonsDataRaw as unknown as Omit<HackathonsPageProps, 'onHackathonClick' | 'onCountryFilter'>

export function HackathonsPage() {
  const navigate = useNavigate()

  const handleHackathonClick = (hackathonId: string) => {
    const hackathon = hackathonsData.hackathons.find(h => h.id === hackathonId)
    if (hackathon) {
      navigate(`/hackathons/${hackathon.slug}`)
    }
  }

  return (
    <Hackathons
      methodology={hackathonsData.methodology}
      hackathons={hackathonsData.hackathons}
      onHackathonClick={handleHackathonClick}
    />
  )
}
