import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const getDistressSignals = async (req: Request, res: Response) => {
  const prisma = new PrismaClient()
  const { page } = req.query
  const pageSize = 10
  let skip = 0

  if (Boolean(page) && typeof page === 'string' && /^\d+$/.test(page)) {
    skip = (Number(page) - 1) * pageSize
  }

  try {
    const panic = await prisma.distressSignal.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).send(panic)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to retrieve distressSignals' })
  } finally {
    await prisma.$disconnect()
  }
}

export default getDistressSignals
