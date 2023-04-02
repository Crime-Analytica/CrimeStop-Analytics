import prisma from '../utils/prismaInstance'

interface ForumInput {
  title: string
  description: string
  ownerId: string
}

export async function createForum (forumInput: ForumInput) {
  const forum = await prisma.forum.create({
    data: {
      title: forumInput.title,
      description: forumInput.description,
      ownerId: forumInput.ownerId
    }
  })

  return forum
}
