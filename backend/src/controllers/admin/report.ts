import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'

/**
 * @swagger
 * /api/get-reports:
 *   get:
 *     summary: Retrieve reports.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           pattern: ^\d+$
 *         description: The page number for pagination.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to retrieve reports
 *
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the report.
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the report was created.
 *           example: '2023-06-17T10:30:00Z'
 *         reportType:
 *           type: string
 *           description: The type of the report.
 *           example: Suspicious Activity
 *         message:
 *           type: string
 *           description: The content of the report.
 *           example: There is suspicious activity in the area.
 *         civilianId:
 *           type: string
 *           description: The ID of the civilian who submitted the report.
 *           example: abc123
 */

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
