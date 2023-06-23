import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prismaInstance'
import Civilian from '../interfaces/civillianInterface'
import Police from '../interfaces/policeInterface'
import User from '../interfaces/userInterface'

const JWT_SECRET = process.env.JWT_SECRET

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<Civilian> => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.civilian.create({
    data: {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }
  })
  return user
}

// export const createUserAdmin = async (
//   firstName: string,
//   lastName: string,
//   email: string,

//   password: string
// ): Promise<Police> => {
//   const hashedPassword = await bcrypt.hash(password, 10)
//   const user = await prisma.police.create({
//     data: {
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       createdAt: new Date().toISOString()
//     }
//   })
//   return user
// }

export const findUserByEmail = async (
  email: string
): Promise<Civilian | Police | undefined> => {
  const [civilian, police] = await Promise.all([
    prisma.civilian.findUnique({ where: { email } }),
    prisma.police.findUnique({ where: { email } })
  ])

  return civilian ?? police ?? undefined
}

export const findUserById = async (
  id: string
): Promise<Civilian | Police | undefined> => {
  const [civilian, police] = await Promise.all([
    prisma.civilian.findUnique({ where: { id } }),
    prisma.police.findUnique({ where: { id } })
  ])

  return civilian ?? police ?? undefined
}

export const generateToken = async (user: User): Promise<string> => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: new Date(),
    ...(user.role === 'civilian'
      ? {
          username: user.username
        }
      : {
          badge: user.badgeNumber,
          rank: user.rank
        })
  }

  try {
    if (JWT_SECRET !== undefined) {
      const token = jwt.sign(payload, JWT_SECRET)
      return token
    }
  } catch (error) {
    console.error(error)
    throw new Error('Unable to generate token')
  }
  throw new Error('JWT_SECRET is not defined')
}
