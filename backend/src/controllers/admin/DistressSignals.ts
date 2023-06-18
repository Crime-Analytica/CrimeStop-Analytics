import { Request, Response } from 'express'
import prisma from '../../utils/prismaInstance'

/**
 * @swagger
 * /api/get-distressSignals:
 *   get:
 *     summary: Retrieve distress signals.
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
 *                 $ref: '#/components/schemas/DistressSignal'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to retrieve distress signals
 *
 * components:
 *   schemas:
 *     DistressSignal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the distress signal.
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the distress signal was created.
 *           example: '2023-06-17T10:30:00Z'
 *         latitude:
 *           type: number
 *           format: float
 *           description: The latitude coordinate of the distress signal location.
 *           example: 37.7749
 *         longitude:
 *           type: number
 *           format: float
 *           description: The longitude coordinate of the distress signal location.
 *           example: -122.4194
 *         message:
 *           type: string
 *           description: The content of the distress signal.
 *           example: Help! I'm in danger!
 *         civilianId:
 *           type: string
 *           description: The ID of the civilian who sent the distress signal.
 *           example: abc123
 */

const getDistressSignals = async (req: Request, res: Response) => {
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
