import { Request, Response } from 'express'
import { addCriminal, deleteCriminal } from '../../helpers/criminalHelpers'
import { logError } from '../../services/loggerManager'
import { criminalSchema } from '../../validations'

/**
 * @swagger
 * /api/add-criminals:
 *   post:
 *     tags:
 *       - Admin - Law Enforcement
 *     summary: Create a new criminal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriminalRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Criminal'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unable to add criminal
 *
 * components:
 *   schemas:
 *     CriminalRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the criminal.
 *           example: John
 *         lastName:
 *           type: string
 *           description: The last name of the criminal.
 *           example: Doe
 *         wantedFor:
 *           type: string
 *           description: The crimes the criminal is wanted for.
 *           example: Robbery
 *         imageUrl:
 *           type: string
 *           description: The URL of the criminal's image.
 *           example: https://example.com/image.jpg
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
 *         wantedFor:
 *           type: string
 *           description: The crimes the criminal is wanted for.
 *           example: Robbery
 *         imageUrl:
 *           type: string
 *           description: The URL of the criminal's image.
 *           example: https://example.com/image.jpg
 */

const postCriminals = async (req: Request, res: Response) => {
  const { firstName, lastName, wantedFor, imageUrl } = criminalSchema.parse(req.body)

  try {
    const newCriminal = await addCriminal(firstName, lastName, wantedFor, imageUrl)
    res.status(201).send(newCriminal)
  } catch (err: any) {
    void logError(err)
    res.status(400).send({ error: 'Unable to add criminal' })
  }
}

/**
 * @swagger
 * /api/criminals/{id}:
 *   put:
 *     tags:
 *       - Admin - Law Enforcement
 *     summary: Delete a criminal by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: The ID of the criminal to delete.
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Criminal not found
 */

const deleteCriminals = async (req: Request, res: Response) => {
  const id = (req.params.id)
  try {
    const deletedCriminal = await deleteCriminal(id)
    if (deletedCriminal !== undefined && deletedCriminal !== null) {
      res.sendStatus(204)
    } else {
      res.status(404).send({ error: 'Criminal not found' })
    }
  } catch (err: any) {
    void logError(err)
    res.status(500).send({ error: 'Unable to delete criminal' })
  }
}

export { postCriminals, deleteCriminals }
