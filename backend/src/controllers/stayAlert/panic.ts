import { Request, Response } from 'express'
import { createDistressSignal } from '../../database/models/models'

const sendDistressSignal = async (req: Request, res: Response) => {
  const { longitude, latitude, message, civilianId } = req.body
  try {
    const newDistressSignal = await createDistressSignal(longitude, latitude, message, civilianId)
    res.status(201).send(newDistressSignal)
  } catch (err) {
    res.status(400).send({ error: 'Unable to send distress signal' })
  }
}

export default sendDistressSignal
