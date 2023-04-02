import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'

const getCriminals = async (req: Request, res: Response) => {
  const { page } = req.query
  const pageSize = 10
  let skip = 0

  if (Boolean(page) && typeof page === 'string' && /^\d+$/.test(page)) {
    skip = (Number(page) - 1) * pageSize
  }

  try {
    const criminals = await prisma.criminal.findMany({
      skip,
      take: pageSize,
      orderBy: { firstName: 'desc' }
    })

    res.status(200).send(criminals)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to retrieve criminals' })
  } finally {
    await prisma.$disconnect()
  }
}

export default getCriminals
