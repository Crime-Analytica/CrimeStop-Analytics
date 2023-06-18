import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'
/**
 * @swagger
 * /api/getcriminals:
 *   get:
 *     summary: Get a list of criminals.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           pattern: '^\d+$'
 *         description: The page number for pagination.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CriminalsResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     Criminal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the criminal.
 *           example: 1
 *         firstName:
 *           type: string
 *           description: The first name of the criminal.
 *           example: John
 *         lastName:
 *           type: string
 *           description: The last name of the criminal.
 *           example: Doe
 *         age:
 *           type: integer
 *           description: The age of the criminal.
 *           example: 30
 *
 *     CriminalsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Criminal'
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message.
 *           example: Internal server error
 */
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
