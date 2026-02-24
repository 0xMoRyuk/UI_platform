/**
 * Renders Home page content tables.
 */

import { table, heading, formatValue, truncate } from '../markdown-writer'
import { fieldNote, isExcluded, isAsset } from '../field-config'

interface HomeData {
  hero: Record<string, unknown>
  kpis: Array<Record<string, unknown>>
  featuredModels: Array<Record<string, unknown>>
  sectionPreviews: Array<Record<string, unknown>>
  kpiSection: { title: string; description: string }
  toolboxHighlight: Record<string, unknown>
}

function flatFields(obj: Record<string, unknown>, prefix = ''): [string, unknown][] {
  const result: [string, unknown][] = []
  for (const [key, value] of Object.entries(obj)) {
    if (isExcluded(key) || isAsset(key)) continue
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result.push(...flatFields(value as Record<string, unknown>, fullKey))
    } else {
      result.push([fullKey, value])
    }
  }
  return result
}

export function renderHome(data: HomeData): string {
  const parts: string[] = []

  // 1.3 Hero
  parts.push(heading(3, '1.3 Home Page — Hero Section'))
  parts.push('')
  const heroFields = flatFields(data.hero)
  const heroRows = heroFields.map(([field, value]) => {
    const strVal = Array.isArray(value) ? `[${(value as unknown[]).length} items]` : formatValue(value)
    return [field, truncate(strVal), '', fieldNote(field.split('.').pop()!, value)]
  })
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], heroRows))

  // Hero stats (few fields per item → single table)
  parts.push('')
  parts.push('**Hero Stats:**')
  parts.push('')
  const heroStats = (data.hero.stats as Array<{ value: string; label: string }>) || []
  const statsRows = heroStats.map((s, i) => [String(i + 1), s.label, s.value, '', '', ''])
  parts.push(table(['#', 'Label', 'Value', 'Your Label', 'Your Value', 'Notes'], statsRows))

  // 1.4 KPI Section
  parts.push('')
  parts.push(heading(3, '1.4 Home Page — KPI Section'))
  parts.push('')
  parts.push(
    table(
      ['Field', 'Current Value', 'Your Content', 'Notes'],
      [
        ['title', data.kpiSection.title, '', fieldNote('title', data.kpiSection.title)],
        ['description', data.kpiSection.description, '', fieldNote('description', data.kpiSection.description)],
      ]
    )
  )

  // 1.5 KPIs
  parts.push('')
  parts.push(heading(3, '1.5 Home Page — KPIs'))
  parts.push('')
  const kpiRows = data.kpis.map((kpi, i) => [
    String(i + 1),
    formatValue(kpi.label),
    String(kpi.value),
    formatValue(kpi.suffix),
    formatValue(kpi.description),
    '',
    '',
    '',
    '',
  ])
  parts.push(
    table(
      ['#', 'Label', 'Value', 'Suffix', 'Description', 'Your Label', 'Your Value', 'Your Description', 'Notes'],
      kpiRows
    )
  )

  // 1.6 Toolbox Highlight
  parts.push('')
  parts.push(heading(3, '1.6 Home Page — Toolbox Highlight'))
  parts.push('')
  const thFields = flatFields(data.toolboxHighlight as Record<string, unknown>)
  const thRows = thFields.map(([field, value]) => {
    const strVal = Array.isArray(value) ? `[${(value as unknown[]).length} items]` : formatValue(value)
    return [field, truncate(strVal), '', fieldNote(field.split('.').pop()!, value)]
  })
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], thRows))

  // Toolbox Highlight stats
  const thStats = (data.toolboxHighlight.stats as Array<{ value: string; label: string }>) || []
  if (thStats.length > 0) {
    parts.push('')
    parts.push('**Toolbox Highlight Stats:**')
    parts.push('')
    const thStatsRows = thStats.map((s, i) => [String(i + 1), s.label, s.value, '', '', ''])
    parts.push(table(['#', 'Label', 'Value', 'Your Label', 'Your Value', 'Notes'], thStatsRows))
  }

  // 1.7 Featured Models
  parts.push('')
  parts.push(heading(3, '1.7 Home Page — Featured Models'))
  parts.push('')
  data.featuredModels.forEach((model, i) => {
    parts.push(heading(4, `Model ${i + 1}: ${model.name}`))
    parts.push('')
    const modelFields = flatFields(model)
    const modelRows = modelFields.map(([field, value]) => [
      field,
      truncate(formatValue(value)),
      '',
      fieldNote(field.split('.').pop()!, value),
    ])
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], modelRows))
    parts.push('')
  })

  // 1.8 Section Previews
  parts.push(heading(3, '1.8 Home Page — Section Previews'))
  parts.push('')
  data.sectionPreviews.forEach((preview, i) => {
    parts.push(heading(4, `Preview ${i + 1}: ${preview.title}`))
    parts.push('')
    const previewFields = flatFields(preview)
    const previewRows = previewFields.map(([field, value]) => [
      field,
      truncate(formatValue(value)),
      '',
      fieldNote(field.split('.').pop()!, value),
    ])
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], previewRows))
    parts.push('')
  })

  return parts.join('\n')
}
