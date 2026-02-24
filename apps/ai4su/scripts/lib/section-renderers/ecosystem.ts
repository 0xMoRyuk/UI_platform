/**
 * Renders Ecosystem page content tables.
 */

import { table, heading, formatValue, truncate, joinArray } from '../markdown-writer'
import { fieldNote, isExcluded, isAsset } from '../field-config'

interface EcosystemData {
  activityTypes: Array<Record<string, unknown>>
  activities: Array<Record<string, unknown>>
  womenFounders: Record<string, unknown>
  countries: Array<Record<string, unknown>>
  pageContent: Record<string, unknown>
}

export function renderEcosystem(data: EcosystemData): string {
  const parts: string[] = []

  // 1.21 Page Content
  parts.push(heading(3, '1.21 Ecosystem — Page Content'))
  parts.push('')
  const pcRows: string[][] = []
  for (const [key, value] of Object.entries(data.pageContent)) {
    if (isExcluded(key)) continue
    if (Array.isArray(value)) {
      pcRows.push([key, joinArray(value as string[]), '', 'Array of labels'])
    } else {
      pcRows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
    }
  }
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], pcRows))

  // 1.22 Activities (many fields → sub-section per entity)
  parts.push('')
  parts.push(heading(3, '1.22 Ecosystem — Activities'))
  parts.push('')
  parts.push(`${data.activities.length} ecosystem activities. Each shown as a sub-section below.`)
  parts.push('')

  data.activities.forEach((activity, i) => {
    parts.push(heading(4, `Activity ${i + 1}: ${activity.title}`))
    parts.push('')
    const rows: string[][] = []
    for (const [key, value] of Object.entries(activity)) {
      if (isExcluded(key) || isAsset(key)) continue
      if (key === 'location' && typeof value === 'object' && value !== null) {
        const loc = value as Record<string, unknown>
        for (const [lk, lv] of Object.entries(loc)) {
          if (isExcluded(lk)) continue
          rows.push([`location.${lk}`, formatValue(lv), '', ''])
        }
      } else if (key === 'highlights' && Array.isArray(value)) {
        rows.push([key, joinArray(value as string[]), '', 'Semicolon-separated list'])
      } else if (key === 'photos' && Array.isArray(value)) {
        rows.push([key, `[${value.length} photos]`, '', 'See Asset Inventory'])
      } else if (key === 'resources' && Array.isArray(value)) {
        const resources = value as Array<Record<string, unknown>>
        resources.forEach((res, ri) => {
          rows.push([`resource[${ri}].title`, formatValue(res.title), '', ''])
          rows.push([`resource[${ri}].type`, formatValue(res.type), '', ''])
        })
      } else {
        rows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
      }
    }
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
    parts.push('')
  })

  // 1.23 Women Founders
  parts.push(heading(3, '1.23 Ecosystem — Women Founders'))
  parts.push('')

  const wf = data.womenFounders
  const wfRows: string[][] = []
  for (const [key, value] of Object.entries(wf)) {
    if (isExcluded(key) || isAsset(key)) continue
    if (key === 'stats' && Array.isArray(value)) {
      const stats = value as Array<{ value: number; label: string; suffix: string }>
      stats.forEach((s, si) => {
        wfRows.push([`stats[${si}].label`, s.label, '', ''])
        wfRows.push([`stats[${si}].value`, String(s.value), '', ''])
        wfRows.push([`stats[${si}].suffix`, s.suffix, '', ''])
      })
    } else if (key === 'programElements' && Array.isArray(value)) {
      const elements = value as Array<{ title: string; description: string }>
      elements.forEach((el, ei) => {
        wfRows.push([`programElements[${ei}].title`, el.title, '', fieldNote('title', el.title)])
        wfRows.push([`programElements[${ei}].description`, truncate(el.description), '', fieldNote('description', el.description)])
      })
    } else if (key === 'testimonials' && Array.isArray(value)) {
      const testimonials = value as Array<Record<string, unknown>>
      testimonials.forEach((t, ti) => {
        for (const [tk, tv] of Object.entries(t)) {
          if (isExcluded(tk) || isAsset(tk)) continue
          wfRows.push([`testimonials[${ti}].${tk}`, truncate(formatValue(tv)), '', fieldNote(tk, tv)])
        }
      })
    } else if (key === 'programDescription' && Array.isArray(value)) {
      (value as string[]).forEach((para, pi) => {
        wfRows.push([`programDescription[${pi}]`, truncate(para), '', 'Can be longer'])
      })
    } else {
      wfRows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
    }
  }
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], wfRows))

  return parts.join('\n')
}
