import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'

const Forum = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findMany()
    res.status(200).send(post)
  } catch (error) {

  }
}

export default Forum
