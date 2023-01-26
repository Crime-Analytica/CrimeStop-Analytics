import { Request, Response } from 'express'
import { createUser } from '../../database/models/models'

const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  try {
    const newUser = await createUser(username, email, password)
    res.status(201).send(newUser)
  } catch (err) {
    res.status(400).send({ error: 'Unable to create user' })
  }
}

export default signUp
