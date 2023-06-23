import prisma from '../utils/prismaInstance'
import crimnal from '../interfaces/criminalInterface'

export const addCriminal = async (firstName: string, lastName: string, wantedFor: string[], imageUrl: string[]): Promise<crimnal> => {
  const criminal = await prisma.criminal.create({
    data: {
      firstName,
      lastName,
      wantedFor,
      imageUrl
    }
  })
  return criminal
}

export const deleteCriminal = async (id: string): Promise<crimnal | null> => {
  const deletedCriminal = await prisma.criminal.delete({
    where: {
      id
    }
  })
  return deletedCriminal
}
