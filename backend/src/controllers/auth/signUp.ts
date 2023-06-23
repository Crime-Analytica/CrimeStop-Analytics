/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import { createUser, findUserByEmail } from '../../helpers/userHelpers'
import { signUpSchema } from '../../validations'
/**
 * @swagger
 * /api/signup/civilian:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Civilian Signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CivilianSignUpRequest'
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
 *     CivilianSignUpRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The civilian's username.
 *           example: john_doe
 *         email:
 *           type: string
 *           format: email
 *           description: The civilian's email.
 *           example: example@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: The civilian's password.
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

const signUpCivilian = async (req: Request, res: Response) => {
  const { username, email, password } = signUpSchema.parse(req.body)

  try {
    const existingUser = await findUserByEmail(email)
    if (existingUser != null) {
      return res.status(400).send({ error: 'Email already exists' })
    }

    const newUser = await createUser(username, email, password)
    res.status(201).send(newUser)
  } catch (err: unknown) {
    console.error(err)
    res.status(500).send({ error: 'Unable to create user' })
  }
}

/**
 * @swagger
 * /api/signup/Law Enforcement:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Law Enforcment Signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PoliceSignUpRequest'
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
 *     PoliceSignUpRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The police officer's username.
 *           example: john_doe
 *         email:
 *           type: string
 *           format: email
 *           description: The police officer's email.
 *           example: example@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: The police officer's password.
 *           example: mypassword123
 *         badgeNumber:
 *           type: string
 *           description: The police officer's badge number.
 *           example: 123456
 *         rank:
 *           type: string
 *           description: The police officer's rank.
 *           example: Sergeant
 *       required:
 *         - username
 *         - email
 *         - password
 *         - badgeNumber
 *         - rank
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

// const signUpLawEnforment = async (req: Request, res: Response) => {
//   const { firstName, lastName, email, password, badgeNumber, department, rank } = signUpSchema.parse(req.body)

//   try {
//     const existingUser = await findUserByEmail(email)
//     if (existingUser != null) {
//       return res.status(400).send({ error: 'Email already exists' })
//     }

//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     const newUser = await createUser(firstName!, lastName!, email, password, badgeNumber, department, rank)
//     res.status(201).send(newUser)
//   } catch (err: unknown) {
//     console.error(err)
//     res.status(500).send({ error: 'Unable to create user' })
//   }
// }

export { signUpCivilian }
