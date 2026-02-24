/**
 * Walks all data.json files and collects asset references (images, PDFs, logos).
 */

import { table, heading } from './markdown-writer'
import { isAsset } from './field-config'

interface AssetRef {
  section: string
  field: string
  path: string
  type: 'image' | 'pdf' | 'logo'
}

function classifyAsset(fieldName: string, path: string): 'image' | 'pdf' | 'logo' {
  if (path.endsWith('.pdf')) return 'pdf'
  if (fieldName.includes('logo') || fieldName.includes('Logo') || fieldName.includes('flag') || fieldName.includes('Flag')) return 'logo'
  return 'image'
}

function collectFromObject(obj: unknown, section: string, parentKey: string, refs: AssetRef[]): void {
  if (obj === null || obj === undefined) return
  if (typeof obj === 'string') return
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectFromObject(item, section, `${parentKey}[${i}]`, refs))
    return
  }
  if (typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (key === '_meta') continue
      if (isAsset(key) && typeof value === 'string') {
        refs.push({
          section,
          field: parentKey ? `${parentKey}.${key}` : key,
          path: value,
          type: classifyAsset(key, value),
        })
      } else {
        collectFromObject(value, section, parentKey ? `${parentKey}.${key}` : key, refs)
      }
    }
  }
}

export function collectAssets(dataSources: Record<string, unknown>): AssetRef[] {
  const refs: AssetRef[] = []
  for (const [section, data] of Object.entries(dataSources)) {
    collectFromObject(data, section, '', refs)
  }
  return refs
}

export function renderAssetInventory(refs: AssetRef[]): string {
  const images = refs.filter((r) => r.type === 'image' || r.type === 'logo')
  const pdfs = refs.filter((r) => r.type === 'pdf')

  const parts: string[] = [heading(2, 'Part 2: Asset Inventory')]

  parts.push('')
  parts.push(heading(3, '2.1 Images & Logos'))
  parts.push('')
  if (images.length > 0) {
    parts.push(
      table(
        ['#', 'Section', 'Field', 'Current Path', 'Replacement Path', 'Notes'],
        images.map((r, i) => [
          String(i + 1),
          r.section,
          r.field,
          r.path,
          '',
          r.type === 'logo' ? 'Logo/flag asset' : 'Image asset',
        ])
      )
    )
  } else {
    parts.push('No image assets found.')
  }

  parts.push('')
  parts.push(heading(3, '2.2 PDF Documents'))
  parts.push('')
  if (pdfs.length > 0) {
    parts.push(
      table(
        ['#', 'Section', 'Field', 'Current Path', 'Replacement Path', 'Notes'],
        pdfs.map((r, i) => [
          String(i + 1),
          r.section,
          r.field,
          r.path,
          '',
          'PDF document',
        ])
      )
    )
  } else {
    parts.push('No PDF assets found.')
  }

  return parts.join('\n')
}
