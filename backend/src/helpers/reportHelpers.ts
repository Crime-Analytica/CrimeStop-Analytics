import prisma from '../utils/prismaInstance'
import report from '../interfaces/reportInterface'

export async function createReport (reportType: string, message: string, civilianId: string): Promise<report> {
  const report = await prisma.report.create({
    data: {
      reportType,
      message,
      createdAt: new Date().toISOString(),
      civilian: {
        connect: { id: civilianId }
      }
    }
  })
  return report
}
