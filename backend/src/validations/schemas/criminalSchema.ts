import { z } from 'zod'

export const criminalSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  wantedFor: z.array(z.string()),
  imageUrl: z.array(z.string().url())

})
