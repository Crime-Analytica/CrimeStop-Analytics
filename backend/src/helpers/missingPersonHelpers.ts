import prisma from '../utils/prismaInstance'
import missingPerson from '../interfaces/missingPersonInterface'

export async function missingPersons (firstName: string, lastName: string, age: number, lastSeen: string, dateMissing: string, imageUrl: string, civilianId: string): Promise<missingPerson> {
  const missingPerson = await prisma.missingPerson.create({
    data: {
      firstName,
      lastName,
      age,
      lastSeen,
      dateMissing,
      imageUrl,
      civilian: {
        connect: { id: civilianId }
      }
    }
  })
  return missingPerson
}
