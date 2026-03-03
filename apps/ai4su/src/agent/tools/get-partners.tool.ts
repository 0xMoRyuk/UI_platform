import { getAllPartners, getAllServiceProviders } from '@/domain/partners'

export const getPartnersTool = {
  name: 'get-partners',
  description: 'List all implementing partners and service providers.',
  parameters: {},
  execute() {
    return {
      implementingPartners: getAllPartners(),
      serviceProviders: getAllServiceProviders(),
    }
  },
}
