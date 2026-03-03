import { z } from 'zod'
import { PaginationParamsSchema } from './common.schema'

export const SectorEnum = z.enum([
  'crop-science',
  'livestock',
  'precision-farming',
  'agri-finance',
  'supply-chain',
  'climate-resilience',
])

export const CountryCodeEnum = z.enum([
  'KE', 'NG', 'GH', 'SN', 'RW', 'ZA', 'EG', 'MA',
])

export const SearchModelsInputSchema = PaginationParamsSchema.extend({
  q: z.string().optional(),
  sector: z.union([SectorEnum, z.array(SectorEnum)]).optional(),
  country: z.union([CountryCodeEnum, z.array(CountryCodeEnum)]).optional(),
})

export const GetModelInputSchema = z.object({
  id: z.string().min(1),
})

export const AIModelOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  useCase: z.string(),
  technicalRequirements: z.string(),
  sector: SectorEnum,
  country: CountryCodeEnum,
  githubUrl: z.string(),
  hackathonId: z.string().optional(),
})

export const FilterOptionsOutputSchema = z.object({
  sectors: z.array(z.object({
    id: SectorEnum,
    label: z.string(),
    color: z.string(),
  })),
  countries: z.array(z.object({
    code: CountryCodeEnum,
    name: z.string(),
  })),
})

export type SearchModelsInput = z.infer<typeof SearchModelsInputSchema>
export type GetModelInput = z.infer<typeof GetModelInputSchema>
export type AIModelOutput = z.infer<typeof AIModelOutputSchema>
