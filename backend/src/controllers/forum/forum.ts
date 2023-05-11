import { logError } from '../../services/loggerManager'
import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'

const Forum = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findMany()
    res.status(200).send(post)
  } catch (error) {
    void logError('500')
  }
}

export default Forum
