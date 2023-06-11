import { z } from 'zod'

export const sendReportSchema = z.object({
  reportType: z.string().min(1),
  message: z.string().min(1),
  civilianId: z.string()
})
