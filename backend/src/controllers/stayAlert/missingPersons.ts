import { Request, Response } from 'express'
import { missingPersons } from '../../helpers/missingPersonHelpers'
import { addMissingPersonSchema } from '../../validations'

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
