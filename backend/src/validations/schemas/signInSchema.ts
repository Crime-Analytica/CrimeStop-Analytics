import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1)
})
