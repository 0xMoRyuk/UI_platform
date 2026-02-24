/**
 * Renders Toolbox page content tables.
 */

import { table, heading, formatValue, truncate, joinArray } from '../markdown-writer'
import { fieldNote, isExcluded, isAsset } from '../field-config'

interface ToolboxData {
  kpiSummary: Array<Record<string, unknown>>
  filterOptions: { sectors: Array<Record<string, unknown>>; countries: Array<Record<string, unknown>> }
  aiModels: Array<Record<string, unknown>>
  studies: Array<Record<string, unknown>>
  bestPractices: Array<Record<string, unknown>>
  finalReport: Record<string, unknown>
  pageContent: Record<string, unknown>
  studiesSection: Record<string, unknown>
  bestPracticesSection: Record<string, unknown>
  finalReportSection: Record<string, unknown>
}

function simpleFields(obj: Record<string, unknown>): [string, string, string][] {
  const rows: [string, string, string][] = []
  for (const [key, value] of Object.entries(obj)) {
    if (isExcluded(key) || isAsset(key)) continue
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      for (const [subKey, subVal] of Object.entries(value as Record<string, unknown>)) {
        if (isExcluded(subKey)) continue
        rows.push([`${key}.${subKey}`, formatValue(subVal), fieldNote(subKey, subVal)])
      }
    } else {
      rows.push([key, formatValue(value), fieldNote(key, value)])
    }
  }
  return rows
}

export function renderToolbox(data: ToolboxData): string {
  const parts: string[] = []

  // 1.9 Page Content
  parts.push(heading(3, '1.9 Toolbox — Page Content'))
  parts.push('')
  const pcRows = simpleFields(data.pageContent)
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], pcRows.map(([f, v, n]) => [f, truncate(v), '', n])))

  // 1.10 AI Models (many fields → sub-section per entity)
  parts.push('')
  parts.push(heading(3, '1.10 Toolbox — AI Models'))
  parts.push('')
  parts.push(`${data.aiModels.length} models total. Each model shown as a sub-section below.`)
  parts.push('')

  data.aiModels.forEach((model, i) => {
    parts.push(heading(4, `Model ${i + 1}: ${model.name}`))
    parts.push('')
    const rows: string[][] = []
    for (const [key, value] of Object.entries(model)) {
      if (isExcluded(key) || isAsset(key)) continue
      rows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
    }
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
    parts.push('')
  })

  // 1.11 Studies Section
  parts.push(heading(3, '1.11 Toolbox — Studies Section'))
  parts.push('')
  const ssRows = simpleFields(data.studiesSection)
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], ssRows.map(([f, v, n]) => [f, truncate(v), '', n])))

  // 1.12 Studies
  parts.push('')
  parts.push(heading(3, '1.12 Toolbox — Studies'))
  parts.push('')
  data.studies.forEach((study, i) => {
    parts.push(heading(4, `Study ${i + 1}: ${(study as Record<string, unknown>).title || `Study ${i + 1}`}`))
    parts.push('')
    const rows: string[][] = []
    for (const [key, value] of Object.entries(study)) {
      if (isExcluded(key) || isAsset(key)) continue
      if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
        rows.push([key, joinArray(value), '', fieldNote(key, value)])
      } else if (Array.isArray(value)) {
        rows.push([key, `[${value.length} items]`, '', 'Array — see data.json for details'])
      } else {
        rows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
      }
    }
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
    parts.push('')
  })

  // 1.13 Best Practices Section
  parts.push(heading(3, '1.13 Toolbox — Best Practices Section'))
  parts.push('')
  const bpSRows = simpleFields(data.bestPracticesSection)
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], bpSRows.map(([f, v, n]) => [f, truncate(v), '', n])))

  // 1.14 Best Practices
  parts.push('')
  parts.push(heading(3, '1.14 Toolbox — Best Practices'))
  parts.push('')
  data.bestPractices.forEach((bp, i) => {
    parts.push(heading(4, `Best Practice ${i + 1}: ${(bp as Record<string, unknown>).title || `BP ${i + 1}`}`))
    parts.push('')
    const rows: string[][] = []
    for (const [key, value] of Object.entries(bp)) {
      if (isExcluded(key) || isAsset(key)) continue
      if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
        rows.push([key, joinArray(value), '', fieldNote(key, value)])
      } else {
        rows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
      }
    }
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
    parts.push('')
  })

  // 1.15 Final Report Section
  parts.push(heading(3, '1.15 Toolbox — Final Report Section'))
  parts.push('')
  const frSRows = simpleFields(data.finalReportSection)
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], frSRows.map(([f, v, n]) => [f, truncate(v), '', n])))

  // 1.16 Final Report
  parts.push('')
  parts.push(heading(3, '1.16 Toolbox — Final Report'))
  parts.push('')
  const frRows: string[][] = []
  for (const [key, value] of Object.entries(data.finalReport)) {
    if (isExcluded(key) || isAsset(key)) continue
    frRows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
  }
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], frRows))

  return parts.join('\n')
}
