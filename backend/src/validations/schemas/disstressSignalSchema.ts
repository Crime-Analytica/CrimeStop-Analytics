import { z } from 'zod'

export const PanicSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  message: z.string(),
  civilianId: z.string()

})
