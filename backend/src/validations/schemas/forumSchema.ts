import { z } from 'zod'

export const addForumSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  ownerId: z.string().uuid()
})
