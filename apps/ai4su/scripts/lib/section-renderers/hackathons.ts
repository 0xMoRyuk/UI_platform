/**
 * Renders Hackathons page content tables.
 */

import { table, heading, formatValue, truncate, joinArray } from '../markdown-writer'
import { fieldNote, isExcluded, isAsset } from '../field-config'

interface HackathonsData {
  methodology: Array<Record<string, unknown>>
  hackathons: Array<Record<string, unknown>>
  pageContent: Record<string, unknown>
  methodologyContent: Record<string, unknown>
  fieldLabels: Record<string, unknown>
}

export function renderHackathons(data: HackathonsData): string {
  const parts: string[] = []

  // 1.17 Page Content
  parts.push(heading(3, '1.17 Hackathons — Page Content'))
  parts.push('')
  const pcRows: string[][] = []
  for (const [key, value] of Object.entries(data.pageContent)) {
    if (isExcluded(key)) continue
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      for (const [subKey, subVal] of Object.entries(value as Record<string, unknown>)) {
        pcRows.push([`${key}.${subKey}`, formatValue(subVal), '', fieldNote(subKey, subVal)])
      }
    } else if (Array.isArray(value)) {
      pcRows.push([key, joinArray(value as string[]), '', 'Array of labels'])
    } else {
      pcRows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
    }
  }
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], pcRows))

  // 1.18 Methodology
  parts.push('')
  parts.push(heading(3, '1.18 Hackathons — Methodology'))
  parts.push('')

  // Methodology section content
  const mcRows: string[][] = []
  for (const [key, value] of Object.entries(data.methodologyContent)) {
    mcRows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
  }
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], mcRows))
  parts.push('')

  // Methodology steps
  parts.push('**Methodology Steps:**')
  parts.push('')
  data.methodology.forEach((step, i) => {
    parts.push(heading(4, `Step ${i + 1}: ${step.title}`))
    parts.push('')
    const rows: string[][] = []
    for (const [key, value] of Object.entries(step)) {
      if (isExcluded(key)) continue
      rows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
    }
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
    parts.push('')
  })

  // 1.19 Field Labels
  parts.push(heading(3, '1.19 Hackathons — Field Labels'))
  parts.push('')
  const flRows: string[][] = []
  for (const [key, value] of Object.entries(data.fieldLabels)) {
    flRows.push([key, formatValue(value), '', fieldNote(key, value)])
  }
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], flRows))

  // 1.20 Hackathon Events (many fields → sub-section per entity)
  parts.push('')
  parts.push(heading(3, '1.20 Hackathons — Events'))
  parts.push('')
  parts.push(`${data.hackathons.length} hackathon events. Each shown as a sub-section below.`)
  parts.push('')

  data.hackathons.forEach((hack, i) => {
    parts.push(heading(4, `Hackathon ${i + 1}: ${hack.name}`))
    parts.push('')
    const rows: string[][] = []
    for (const [key, value] of Object.entries(hack)) {
      if (isExcluded(key) || isAsset(key)) continue
      if (key === 'location' && typeof value === 'object' && value !== null) {
        const loc = value as Record<string, unknown>
        for (const [lk, lv] of Object.entries(loc)) {
          if (isExcluded(lk)) continue
          rows.push([`location.${lk}`, formatValue(lv), '', ''])
        }
      } else if (key === 'challengeBrief' && typeof value === 'object' && value !== null) {
        const cb = value as Record<string, unknown>
        for (const [ck, cv] of Object.entries(cb)) {
          if (isExcluded(ck) || isAsset(ck)) continue
          rows.push([`challengeBrief.${ck}`, truncate(formatValue(cv)), '', fieldNote(ck, cv)])
        }
      } else if (key === 'winningTeams' && Array.isArray(value)) {
        const teams = value as Array<Record<string, unknown>>
        teams.forEach((team, ti) => {
          for (const [tk, tv] of Object.entries(team)) {
            if (isExcluded(tk)) continue
            rows.push([`winningTeam[${ti}].${tk}`, truncate(formatValue(tv)), '', fieldNote(tk, tv)])
          }
        })
      } else if (key === 'partners' && Array.isArray(value)) {
        rows.push([key, joinArray(value as string[]), '', 'Semicolon-separated list'])
      } else if (key === 'outcomes' && Array.isArray(value)) {
        rows.push([key, joinArray(value as string[]), '', 'Semicolon-separated list'])
      } else if (key === 'photos' && Array.isArray(value)) {
        rows.push([key, `[${value.length} photos]`, '', 'See Asset Inventory'])
      } else {
        rows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
      }
    }
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
    parts.push('')
  })

  return parts.join('\n')
}
