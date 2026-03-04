import countriesData from '../../product/shared/countries.json'
import sectorsData from '../../product/shared/sectors.json'

type CountryEntry = { code: string; name: string; flag: string }
type SectorEntry = { id: string; label: string; color: string }

const countries = countriesData as CountryEntry[]
const sectors = sectorsData as SectorEntry[]

export const countryFlags: Record<string, string> = Object.fromEntries(
  countries.map((c) => [c.code, c.flag])
)

export const countryNames: Record<string, string> = Object.fromEntries(
  countries.map((c) => [c.code, c.name])
)

export const sectorLabels: Record<string, string> = Object.fromEntries(
  sectors.map((s) => [s.id, s.label])
)

export const sectorColors: Record<string, { bg: string; text: string }> = Object.fromEntries(
  sectors.map((s) => [s.id, { bg: `${s.color}15`, text: s.color }])
)

/** For ToolboxHighlight which uses display-name keys */
export const sectorColorsByLabel: Record<string, { bg: string; text: string; border: string }> =
  Object.fromEntries(
    sectors.map((s) => [s.label, { bg: `${s.color}15`, text: s.color, border: `${s.color}30` }])
  )

export { countries, sectors }
