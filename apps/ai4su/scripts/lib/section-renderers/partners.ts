/**
 * Renders Partners page content tables.
 */

import { table, heading, formatValue, truncate, joinArray } from '../markdown-writer'
import { fieldNote, isExcluded, isAsset } from '../field-config'

interface PartnersData {
  pageIntro: Record<string, unknown>
  funders: Record<string, unknown>
  implementingPartners: Record<string, unknown>
  serviceProviders: Array<Record<string, unknown>>
  datagovInitiative: Record<string, unknown>
  socialLinks: Record<string, unknown>
  euAttribution?: Record<string, unknown>
}

function renderFlatObject(obj: Record<string, unknown>, prefix = ''): string[][] {
  const rows: string[][] = []
  for (const [key, value] of Object.entries(obj)) {
    if (isExcluded(key) || isAsset(key)) continue
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      rows.push(...renderFlatObject(value as Record<string, unknown>, fullKey))
    } else if (Array.isArray(value)) {
      if (value.every((v) => typeof v === 'string')) {
        rows.push([fullKey, joinArray(value), '', 'Semicolon-separated'])
      } else {
        rows.push([fullKey, `[${value.length} items]`, '', 'See sub-sections'])
      }
    } else {
      rows.push([fullKey, truncate(formatValue(value)), '', fieldNote(key, value)])
    }
  }
  return rows
}

export function renderPartners(data: PartnersData): string {
  const parts: string[] = []

  // 1.24 Page Intro
  parts.push(heading(3, '1.24 Partners — Page Intro'))
  parts.push('')
  const introRows = renderFlatObject(data.pageIntro)
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], introRows))

  // 1.25 Funders
  parts.push('')
  parts.push(heading(3, '1.25 Partners — Funders'))
  parts.push('')
  const fundersRows = renderFlatObject(data.funders)
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], fundersRows))

  // Team Europe members
  const funders = data.funders as Record<string, unknown>
  const teamEurope = funders.teamEurope as Record<string, unknown> | undefined
  if (teamEurope) {
    const members = teamEurope.members as Array<Record<string, unknown>> | undefined
    if (members) {
      parts.push('')
      parts.push('**Team Europe Members:**')
      parts.push('')
      members.forEach((member, i) => {
        const rows: string[][] = []
        for (const [key, value] of Object.entries(member)) {
          if (isExcluded(key) || isAsset(key)) continue
          rows.push([key, formatValue(value), '', fieldNote(key, value)])
        }
        parts.push(heading(4, `Member ${i + 1}: ${member.name}`))
        parts.push('')
        parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
        parts.push('')
      })
    }
  }

  // 1.26 Implementing Partners
  parts.push(heading(3, '1.26 Partners — Implementing Partners'))
  parts.push('')
  const ip = data.implementingPartners as Record<string, unknown>
  const ipPartners = (ip.partners || ip) as Array<Record<string, unknown>> | Record<string, unknown>

  if (Array.isArray(ipPartners)) {
    ipPartners.forEach((partner, i) => {
      parts.push(heading(4, `Partner ${i + 1}: ${partner.name}`))
      parts.push('')
      const rows: string[][] = []
      for (const [key, value] of Object.entries(partner)) {
        if (isExcluded(key) || isAsset(key)) continue
        if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
          rows.push([key, joinArray(value), '', 'Semicolon-separated list'])
        } else if (Array.isArray(value)) {
          rows.push([key, `[${value.length} items]`, '', ''])
        } else {
          rows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
        }
      }
      parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
      parts.push('')
    })
  } else {
    const ipRows = renderFlatObject(ip)
    parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], ipRows))
  }

  // 1.27 Service Providers
  parts.push(heading(3, '1.27 Partners — Service Providers'))
  parts.push('')
  const spArray = Array.isArray(data.serviceProviders)
    ? data.serviceProviders
    : ((data.serviceProviders as Record<string, unknown>).providers as Array<Record<string, unknown>>) || []

  if (Array.isArray(spArray)) {
    spArray.forEach((sp, i) => {
      parts.push(heading(4, `Provider ${i + 1}: ${sp.name}`))
      parts.push('')
      const rows: string[][] = []
      for (const [key, value] of Object.entries(sp)) {
        if (isExcluded(key) || isAsset(key)) continue
        if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
          rows.push([key, joinArray(value), '', 'Semicolon-separated list'])
        } else {
          rows.push([key, truncate(formatValue(value)), '', fieldNote(key, value)])
        }
      }
      parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], rows))
      parts.push('')
    })
  }

  // 1.28 DataGov Initiative
  parts.push(heading(3, '1.28 Partners — DataGov Initiative'))
  parts.push('')
  const dgRows = renderFlatObject(data.datagovInitiative)
  parts.push(table(['Field', 'Current Value', 'Your Content', 'Notes'], dgRows))

  return parts.join('\n')
}
