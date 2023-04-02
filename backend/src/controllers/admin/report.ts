import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'

const getReports = async (req: Request, res: Response) => {
  const { page } = req.query
  const pageSize = 10
  let skip = 0

  if (Boolean(page) && typeof page === 'string' && /^\d+$/.test(page)) {
    skip = (Number(page) - 1) * pageSize
  }

  try {
    const reports = await prisma.report.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).send(reports)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to retrieve reports' })
  } finally {
    await prisma.$disconnect()
  }
}

export default getReports
