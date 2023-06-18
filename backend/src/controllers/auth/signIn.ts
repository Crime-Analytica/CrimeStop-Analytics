import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { findUserByEmail, generateToken } from '../../helpers/userHelpers'
import { signInSchema } from '../../validations'

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Sign in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     SignInRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email.
 *           example: example@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password.
 *           example: mypassword123
 *       required:
 *         - email
 *         - password
 *
 *     SignInResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           description: The signed-in user object.
 *           example:
 *             id: 1
 *             name: John Doe
 *             email: example@example.com
 *         token:
 *           type: string
 *           description: The generated authentication token.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message.
 *           example: Invalid email or password
 */

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
