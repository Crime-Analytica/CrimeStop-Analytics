import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { findUserByEmail, generateToken } from '../../helpers/userHelpers'
import { signInSchema } from '../../validations'

const signIn = async (req: Request, res: Response) => {
  const { email, password } = signInSchema.parse(req.body)

  try {
    const user = await findUserByEmail(email)
    if (user === undefined) {
      throw new Error('user is undefined')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      res.status(401).send({ error: 'Invalid email or password' })
      return
    }

    const token = await generateToken(user)
    res.status(200).send({ user, token })
  } catch (err: any) {
    res.status(500).send({
      error: 'An error occurred while trying to sign in'
    })
  }
}

export default signIn
