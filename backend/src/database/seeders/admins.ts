import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seedAdmins () {
  const password = 'admin1234'
  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.police.create({
    data: {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin9@gmail.com',
      password: hashedPassword,
      badgeNumber: '202090',
      rank: 'Inspector',
      role: 'police-admin'
    }
  })
}

void seedAdmins()
