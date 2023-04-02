import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'

const getMissingPersons = async (req: Request, res: Response) => {
  const { page } = req.query
  const pageSize = 10
  let skip = 0

  if (Boolean(page) && typeof page === 'string' && /^\d+$/.test(page)) {
    skip = (Number(page) - 1) * pageSize
  }

  try {
    const missingPersons = await prisma.missingPerson.findMany({
      skip,
      take: pageSize,
      orderBy: { firstName: 'desc' }
    })

    res.status(200).send(missingPersons)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to retrieve missing persons' })
  } finally {
    await prisma.$disconnect()
  }
}

export default getMissingPersons
