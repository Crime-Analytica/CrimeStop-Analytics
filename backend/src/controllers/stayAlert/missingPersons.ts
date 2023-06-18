import { Request, Response } from 'express'
import { missingPersons } from '../../helpers/missingPersonHelpers'
import { addMissingPersonSchema } from '../../validations'

/**
 * @swagger
 * /api/create-missing-persons:
 *   post:
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

const CreateMissingPersons = async (req: Request, res: Response) => {
  const { firstName, lastName, lastSeen, age, dateMissing, imageUrl, civilianId } = addMissingPersonSchema.parse(req.body)

  try {
    const newMissingPersons = await missingPersons(firstName, lastName, age, lastSeen, dateMissing, imageUrl, civilianId)
    res.status(201).send(newMissingPersons)
  } catch (err) {
    res.status(400).send({ error: 'Unable to add missing person' })
  }
}

export default CreateMissingPersons
