import { Request, Response } from 'express'
import { addCriminal } from '../../helpers/criminalHelpers'
import { logError } from '../../services/loggerManager'
import { criminalSchema } from '../../validations'

/**
 * @swagger
 * /api/add-criminals:
 *   post:
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

export default postCriminals
