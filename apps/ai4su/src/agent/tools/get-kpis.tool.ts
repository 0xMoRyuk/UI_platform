import { getKPIs, getCountries } from '@/domain/home'

export const getKpisTool = {
  name: 'get-kpis',
  description: 'Get programme KPIs and country list.',
  parameters: {},
  execute() {
    return { kpis: getKPIs(), countries: getCountries() }
  },
}
