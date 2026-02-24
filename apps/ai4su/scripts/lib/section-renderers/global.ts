/**
 * Renders Header, Navigation, and Footer sections from shell/data.json.
 */

import { table, heading, formatValue } from '../markdown-writer'
import { fieldNote } from '../field-config'

interface ShellData {
  header: {
    logoText: string
    search: Record<string, string>
    languages: Array<{ code: string; label: string }>
  }
  navigation: Array<{ label: string; href: string }>
  footer: Record<string, unknown>
}

export function renderGlobal(data: ShellData): string {
  const parts: string[] = []

  // 1.1 Header & Navigation
  parts.push(heading(3, '1.1 Global — Header & Navigation'))
  parts.push('')

  const headerRows: string[][] = [
    ['Logo Text', data.header.logoText, '', fieldNote('label', data.header.logoText)],
    ['Search (EN)', data.header.search.en, '', '🇫🇷 Bilingual'],
    ['Search (FR)', data.header.search.fr, '', '🇫🇷 French version'],
  ]

  data.header.languages.forEach((lang) => {
    headerRows.push([`Language: ${lang.code}`, lang.label, '', ''])
  })

  data.navigation.forEach((nav, i) => {
    headerRows.push([`Nav ${i + 1} Label`, nav.label, '', fieldNote('label', nav.label)])
    headerRows.push([`Nav ${i + 1} Href`, nav.href, '', 'URL path'])
  })

  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], headerRows))

  // 1.2 Footer
  parts.push('')
  parts.push(heading(3, '1.2 Global — Footer'))
  parts.push('')

  const footer = data.footer as Record<string, unknown>
  const footerRows: string[][] = []

  // EN fields
  const en = footer.en as Record<string, string>
  for (const [key, value] of Object.entries(en)) {
    footerRows.push([`${key} (EN)`, value, '', '🇫🇷 Bilingual'])
  }

  // FR fields
  const fr = footer.fr as Record<string, string>
  for (const [key, value] of Object.entries(fr)) {
    footerRows.push([`${key} (FR)`, value, '', '🇫🇷 French version'])
  }

  footerRows.push(['Partners Heading', formatValue(footer.partnersHeading), '', ''])

  const partners = footer.partners as string[]
  partners.forEach((p, i) => {
    footerRows.push([`Partner ${i + 1}`, p, '', ''])
  })

  footerRows.push(['Follow Heading', formatValue(footer.followHeading), '', ''])

  const hashtags = footer.hashtags as string[]
  hashtags.forEach((h, i) => {
    footerRows.push([`Hashtag ${i + 1}`, h, '', ''])
  })

  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], footerRows))

  return parts.join('\n')
}
