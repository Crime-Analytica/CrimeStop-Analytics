import { Request, Response } from 'express'
import { addCriminal } from '../../helpers/criminalHelpers'
import { logError } from '../../services/loggerManager'
import { criminalSchema } from '../../validations'

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
