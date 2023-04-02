import { z } from 'zod'

const criminalSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  wantedFor: z.array(z.string()),
  imageUrl: z.array(z.string().url())

})

// type criminal = z.infer<typeof criminalSchema>

export default criminalSchema
