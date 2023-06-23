import prisma from '../utils/prismaInstance'
import distressSignal from '../interfaces/distressSignalInterface'

export const createDistressSignal = async (latitude: number, longitude: number, message: string, civilianId: string): Promise<distressSignal> => {
  const panic = await prisma.distressSignal.create({
    data: {
      latitude,
      longitude,
      message,
      createdAt: new Date().toISOString(),
      civilian: {
        connect: { id: civilianId }
      }
    }
  })
  return panic
}

export const deleteSignal = async (id: string): Promise<void> => {
  await prisma.distressSignal.delete({
    where: { id }
  })
}
