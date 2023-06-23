import { Request, Response } from 'express'
import { createDistressSignal } from '../../helpers/distressSignalHelpers'
import { PanicSchema } from '../../validations'
/**
 * @swagger
 * /api/distress-signals:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Stay Alert
 *     summary: Send a distress signal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DistressSignalRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DistressSignalResponse'
 *
 * components:
 *   schemas:
 *     DistressSignalRequest:
 *       type: object
 *       properties:
 *         latitude:
 *           type: number
 *           description: The latitude coordinate of the distress signal.
 *           example: 37.7749
 *         longitude:
 *           type: number
 *           description: The longitude coordinate of the distress signal.
 *           example: -122.4194
 *         message:
 *           type: string
 *           description: The message associated with the distress signal.
 *           example: Help! I'm in danger!
 *         civilianId:
 *           type: string
 *           description: The ID of the civilian sending the distress signal.
 *           example: ABC123
 *     DistressSignalResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the distress signal.
 *           example: 1
 *         latitude:
 *           type: number
 *           description: The latitude coordinate of the distress signal.
 *           example: 37.7749
 *         longitude:
 *           type: number
 *           description: The longitude coordinate of the distress signal.
 *           example: -122.4194
 *         message:
 *           type: string
 *           description: The message associated with the distress signal.
 *           example: Help! I'm in danger!
 *         civilianId:
 *           type: string
 *           description: The ID of the civilian sending the distress signal.
 *           example: ABC123
 */

const sendDistressSignal = async (req: Request, res: Response) => {
  const { latitude, longitude, message, civilianId } = PanicSchema.parse(req.body)
  try {
    const newDistressSignal = await createDistressSignal(latitude, longitude, message, civilianId)
    res.status(201).send(newDistressSignal)
  } catch (err) {
    res.status(400).send({ error: 'Unable to send distress signal' })
  }
}

export default sendDistressSignal
