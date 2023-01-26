import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET

interface User {
  id: string
  email: string
  role: string | undefined
  badgeNumber?: string
  rank?: string
}

interface Civilian extends User {
  id: string
  username: string
  email: string
  password: string
  createdAt: Date
  role: string
}

interface Police extends User {
  firstName: string
  lastName: string
  email: string
  password: string
  badgeNumber: string
  rank: string
  role: string
}

interface missingPersons {
  firstName: string
  lastName: string
  lastSeen: string
  imageUrl: string
}

export async function createUser (
  username: string,
  email: string,
  password: string
): Promise<Civilian> {
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

export async function findUserByEmail (
  email: string
): Promise<Civilian | Police | undefined> {
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

export async function findUserById (id: string): Promise<Civilian | Police | undefined> {
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

export async function addMissingPersons (firstName: string, lastName: string, lastSeen: string, imageUrl: string): Promise<missingPersons> {
  const missingPerson = await prisma.addMissingPerson.create({
    data: {
      firstName,
      lastName,
      lastSeen,
      imageUrl
    }
  })
  return missingPerson
}

export async function generateToken (user: User): Promise<string> {
  let payload
  if (user.role === 'civilian') {
    payload = {
      id: user.id,
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
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
  return token
}
