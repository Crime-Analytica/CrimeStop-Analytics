import prisma from '../utils/prismaInstance'
import Forum from '../interfaces/forumInterface'

export const createForum = async (title: string, description: string, ownerId: string): Promise<Forum> => {
  const forum = await prisma.forum.create({
    data: {
      title,
      description,
      ownerId
    }
  })

  return forum
}
