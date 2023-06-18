import { Request, Response } from 'express'
import { createUser } from '../../helpers/userHelpers'
import { signUpSchema } from '../../validations'

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Sign up user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username.
 *           example: john_doe
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
 *         - username
 *         - email
 *         - password
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user's ID.
 *           example: 1
 *         username:
 *           type: string
 *           description: The user's username.
 *           example: john_doe
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email.
 *           example: example@example.com
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message.
 *           example: Unable to create user
 */

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
