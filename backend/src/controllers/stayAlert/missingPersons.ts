import { Request, Response } from 'express'
import prisma from '../../utils/prismaInstance'
import { missingPersons, deleteMissing } from '../../helpers/missingPersonHelpers'
import { addMissingPersonSchema } from '../../validations'
/**
 * @swagger
 * /api/create-missing-persons:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Stay Alert
 *     summary: Create a new missing person entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMissingPersonRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingPerson'
 *
 * components:
 *   schemas:
 *     CreateMissingPersonRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         lastSeen:
 *           type: string
 *         age:
 *           type: integer
 *         dateMissing:
 *           type: string
 *         imageUrl:
 *           type: string
 *         civilianId:
 *           type: string
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
 */

const createMissingPersons = async (req: Request, res: Response) => {
  const { firstName, lastName, lastSeen, age, dateMissing, imageUrl, civilianId } = addMissingPersonSchema.parse(req.body)

  try {
    const newMissingPersons = await missingPersons(firstName, lastName, age, lastSeen, dateMissing, imageUrl, civilianId)
    res.status(201).send(newMissingPersons)
  } catch (err) {
    res.status(400).send({ error: 'Unable to add missing person' })
  }
}

/**
 * @swagger
 * /api/missing-persons:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Stay Alert
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
/**
 * @swagger
 * /api/delete-missing-persons/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Stay Alert
 *       - Admin - Law Enforcement
 *     summary: Delete a missing person entry.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the missing person to delete.
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete missing person
 */

const deleteMissingPerson = async (req: Request, res: Response) => {
  const id = (req.params.id)

  try {
    await deleteMissing(id)
    res.sendStatus(204)
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete missing person' })
  }
}

export { createMissingPersons, deleteMissingPerson, getMissingPersons }
