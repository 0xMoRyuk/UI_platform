import { z } from 'zod'

export const GetPartnerInputSchema = z.object({
  id: z.string().min(1),
})

export type GetPartnerInput = z.infer<typeof GetPartnerInputSchema>
