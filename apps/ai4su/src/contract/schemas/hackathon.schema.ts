import { z } from 'zod'
import { PaginationParamsSchema } from './common.schema'
import { CountryCodeEnum } from './model.schema'

export const SearchHackathonsInputSchema = PaginationParamsSchema.extend({
  country: CountryCodeEnum.optional(),
})

export const GetHackathonInputSchema = z.object({
  slug: z.string().min(1),
})

export const HackathonLocationSchema = z.object({
  venue: z.string(),
  city: z.string(),
  country: z.string(),
  countryCode: CountryCodeEnum,
})

export const HackathonOutputSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  theme: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: HackathonLocationSchema,
  participantCount: z.number(),
  teamCount: z.number(),
  modelsProduced: z.number(),
  modelIds: z.array(z.string()),
  heroImage: z.string(),
})

export type SearchHackathonsInput = z.infer<typeof SearchHackathonsInputSchema>
