import prisma from '../utils/prismaInstance'
import Post from '../interfaces/postInterface'

const createPost = async (content: string, forumId: number, authorId: string): Promise <Post> => {
  const post = await prisma.post.create({
    data: {
      content,
      forumId,
      authorId
    },
    include: {
      author: true
    }
  })
  return post
}
export default createPost
