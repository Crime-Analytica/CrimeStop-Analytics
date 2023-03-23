import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Civilian from '../../types/civillianType'
import Police from '../../types/policeType'
import missingPerson from '../../types/missingPersonType'
import distressSignal from '../../types/distressSignalType'
import report from '../../types/reportType'
import crimnal from '../../types/criminalType'
import user from '../../types/userType'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET

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

export async function missingPersons (firstName: string, lastName: string, lastSeen: string, age: number, dateMissing: string, imageUrl: string, civilianId: string): Promise<missingPerson> {
  const missingPerson = await prisma.missingPerson.create({
    data: {
      firstName,
      lastName,
      lastSeen,
      age,
      dateMissing,
      imageUrl,
      civilian: {
        connect: { id: civilianId }
      }
    }
  })
  return missingPerson
}

export async function createReport (reportType: string, message: string, civilianId: string): Promise<report> {
  const report = await prisma.report.create({
    data: {
      reportType,
      message,
      createdAt: new Date().toISOString(),
      civilian: {
        connect: { id: civilianId }
      }
    }
  })
  return report
}

export async function createDistressSignal (latitude: number, longitude: number, message: string, civilianId: string): Promise<distressSignal> {
  const panic = await prisma.distressSignal.create({
    data: {
      latitude,
      longitude,
      message,
      createdAt: new Date().toISOString(),
      civilian: {
        connect: { id: civilianId }
      }
    }
  })
  return panic
}

export async function addCriminal (firstName: string, lastName: string, wantedFor: string, imageUrl: string): Promise<crimnal> {
  const criminal = await prisma.criminal.create({
    data: {
      firstName,
      lastName,
      wantedFor,
      imageUrl
    }
  })
  return criminal
}

export async function generateToken (user: user): Promise<string> {
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
