import { z } from 'zod'
import { PaginationParamsSchema } from './common.schema'

export const SearchJobsInputSchema = PaginationParamsSchema.extend({
  q: z.string().optional(),
  type: z.string().optional(),
  sector: z.string().optional(),
  location: z.string().optional(),
})

export const GetJobInputSchema = z.object({
  slug: z.string().min(1),
})

export type SearchJobsInput = z.infer<typeof SearchJobsInputSchema>
export type GetJobInput = z.infer<typeof GetJobInputSchema>
