import { Request, Response } from 'express'
import { createUser } from '../../helpers/userHelpers'
import { signUpSchema } from '../../validations'

const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = signUpSchema.parse(req.body)
  try {
    const newUser = await createUser(username, email, password)
    res.status(201).send(newUser)
  } catch (err: unknown) {
    res.status(400).send({ error: 'Unable to create user' })
  }
}

export default signUp
