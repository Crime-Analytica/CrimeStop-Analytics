import { z } from 'zod'

export const addMissingPersonSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  lastSeen: z.string().min(1),
  age: z.number(),
  dateMissing: z.string().min(1),
  imageUrl: z.string().min(1),
  civilianId: z.string()
})
