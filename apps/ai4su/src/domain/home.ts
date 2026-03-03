import type { KPI, Country } from '../../product/sections/home/types'
import homeData from '../../product/sections/home/data.json'

const kpis = homeData.kpis as KPI[]
const countries = homeData.countries as Country[]

export function getKPIs(): KPI[] {
  return kpis
}

export function getCountries(): Country[] {
  return countries
}
