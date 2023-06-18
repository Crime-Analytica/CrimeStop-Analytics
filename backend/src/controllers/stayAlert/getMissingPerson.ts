import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'

/**
 * @swagger
 * /api/missing-persons:
 *   get:
 *     summary: Retrieve a list of missing persons.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: The page number of the results.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingPersonsResponse'
 *
 * components:
 *   schemas:
 *     MissingPerson:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The missing person's ID.
 *           example: 1
 *         firstName:
 *           type: string
 *           description: The first name of the missing person.
 *           example: John
 *         lastName:
 *           type: string
 *           description: The last name of the missing person.
 *           example: Doe
 *         lastSeen:
 *           type: string
 *           description: The last seen location of the missing person.
 *           example: City Park
 *         age:
 *           type: integer
 *           description: The age of the missing person.
 *           example: 25
 *         dateMissing:
 *           type: string
 *           description: The date the person went missing.
 *           example: 2023-06-17
 *         imageUrl:
 *           type: string
 *           description: The URL of the missing person's image.
 *           example: https://example.com/image.jpg
 *         civilianId:
 *           type: string
 *           description: The ID of the civilian reporting the missing person.
 *           example: ABC123
 *     MissingPersonsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MissingPerson'
 */

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
