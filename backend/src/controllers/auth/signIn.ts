/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { findUserByEmail, generateToken } from '../../database/models/models'
import BadRequestError from '../../errors/badRequestError'

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await findUserByEmail(email)
    if (user === undefined) {
      throw new BadRequestError('user is undefined')
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
