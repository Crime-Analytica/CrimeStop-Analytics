import prisma from '../utils/prismaInstance'
import report from '../interfaces/reportInterface'

export const createReport = async (reportType: string, message: string, civilianId: string): Promise<report> => {
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

export const DeleteReport = async (id: string): Promise<void> => {
  await prisma.distressSignal.delete({
    where: { id }
  })
}
