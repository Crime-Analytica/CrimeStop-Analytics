
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prismaInstance'
import Civilian from '../interfaces/civillianInterface'
import Police from '../interfaces/policeInterface'
import user from '../interfaces/userInterface'

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

export const findUserByEmail = async (
  email: string
): Promise<Civilian | Police | undefined> => {
  const civilian = await prisma.civilian.findUnique({
    where: {
      email
    }
  })
  if (civilian != null) return civilian

  const police = await prisma.police.findUnique({
    where: {
      email
    }
  })
  if (police != null) return police
  return undefined
}

export const findUserById = async (id: string): Promise<Civilian | Police | undefined> => {
  const civilian = await prisma.civilian.findUnique({
    where: {
      id
    }
  })
  if (civilian != null) return civilian

  const police = await prisma.police.findUnique({
    where: {
      id
    }
  })
  if (police != null) return police
  return undefined
}

export const generateToken = async (user: user): Promise<string> => {
  let payload
  if (user.role === 'civilian') {
    payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: new Date(),
      role: user.role
    }
  } else {
    payload = {
      id: user.id,
      email: user.email,
      badge: user.badgeNumber,
      rank: user.rank,
      role: user.role
    }
  }
  if (JWT_SECRET == null) throw new Error('JWT_SECRET is not defined')
  const token = jwt.sign(payload, JWT_SECRET)
  return token
}
