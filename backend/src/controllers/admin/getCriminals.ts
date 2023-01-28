import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getCriminals = async (req: Request, res: Response) => {
  try {
    const {
      firstName, lastName, wantedFor, imageUrl
    } = req.body
    await prisma.criminal.create({
      data: {
        firstName,
        lastName,
        wantedFor,
        imageUrl
      }
    })
    res.json({ success: true, message: 'Criminal added successfully' })
  } catch (error) {
    res.json({ success: false, message: 'An error occured', error })
  }
}

export default getCriminals
