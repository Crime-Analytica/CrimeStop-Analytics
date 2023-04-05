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
