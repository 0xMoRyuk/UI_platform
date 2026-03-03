import type { ImplementingPartner, ServiceProvider } from '../../product/sections/partners/types'
import partnersData from '../../product/sections/partners/data.json'

const allPartners = (partnersData.implementingPartners as { partners: ImplementingPartner[] }).partners
const allProviders = (partnersData.serviceProviders as { providers: ServiceProvider[] }).providers

export function getAllPartners(): ImplementingPartner[] {
  return allPartners
}

export function getPartnerById(id: string): ImplementingPartner | null {
  return allPartners.find((p) => p.id === id) ?? null
}

export function getAllServiceProviders(): ServiceProvider[] {
  return allProviders
}

export function getServiceProviderById(id: string): ServiceProvider | null {
  return allProviders.find((p) => p.id === id) ?? null
}
